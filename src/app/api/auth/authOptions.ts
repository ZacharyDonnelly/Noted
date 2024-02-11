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
      id: 'domain-signup',
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        confirmPassword: { label: 'Confirm Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) return null;
        const { name, email, password, confirmPassword } = credentials;
        try {
          const { data } = await axios.post(
            'http://localhost:3000/api/auth/user',
            {
              name,
              email,
              password,
              confirmPassword
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          return { data, name, email, password, confirmPassword };
        } catch (error) {
          console.error(`Error logging in: ${error}`);
          throw new Error(`Error logging in: ${error}`);
        }
      }
    }),
    CredentialsProvider({
      id: 'domain-login',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email Address', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        try {
          const { data } = await axios.post(
            'http://localhost:3000/api/auth/user/login',
            {
              email,
              password
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          if (data) {
            return data;
          }
        } catch (error) {
          console.error(`Error logging in: ${error}`);
          throw new Error(`Error logging in: ${error}`);
        }
        return { email, password };
      }
    })
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, newSession, trigger }) {
      session.user = { name: '', email: '', accessToken: '' };
      if (trigger === 'update' && newSession?.name) {
        session.accessToken = token.jti as string;
        session.user.name = newSession.name;
        session.user.email = newSession.email;
        session.user.accessToken = token.jti as string;
      } else if (session.user) {
        session.user.name = token?.name as string;
        session.user.email = token?.email as string;
        session.user.accessToken = token.jti as string;
        session.accessToken = token.jti as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name as string;
        token.email = user.email as string;
      }
      return token;
    }
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/api/auth/signup',
    signOut: '/api/auth/signout'
  },
  debug: true
};
export default authOptions;
