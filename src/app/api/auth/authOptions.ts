import prismadb from '@/utils/prisma/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import axios from 'axios';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'string' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        confirmPassword: { label: 'Confirm Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { name, email, password, confirmPassword } = credentials;

        const { data } = await axios.post(
          `http://localhost:3000/api/auth/user?name=${name}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (data) {
          return data;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.name;
      }

      return token;
    },
    async signIn() {
      return true;
    },
    async session({ session, token, newSession, trigger }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = { name: '', email: '' };
      if (trigger === 'update' && newSession?.name) {
        session.user.name = newSession.name;
        session.user.email = newSession.email;
      } else {
        session.user.name = token?.name as string;
        session.user.email = token?.email as string;
        session.accessToken = token.accessToken as string;
      }

      return session;
    }
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/api/auth/signup',
    signOut: '/api/auth/signout'
  }
};
export default authOptions;
