import type {
  AuthOptions,
  DefaultSession,
  JWT,
  JWTProps,
  RedirectProps,
  Session,
  SessionProps
} from '@/types/api/callbacks';
import { LocalUser } from '@/types/user';
import prismadb from '@/utils/prisma/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = new PrismaClient();

const handler: AuthOptions = NextAuth({
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
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) return null;
        const { name, email, password } = credentials;

        try {
          const response = await fetch('http://localhost:3000/api/auth/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
          });

          const data = await response.json();
          return { data, name, email, password };
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
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          console.error('Information is not available. Could not log you in. Please try again later.');
          throw new Error('Information is not available. Could not log you in. Please try again later.');
        } else {
          const { email, password } = credentials;

          const existingUser = await prisma.user.findUnique({
            where: {
              email
            }
          });

          if (existingUser) {
            const isValid: boolean = bcrypt.compareSync(password, existingUser.passwordHash);

            if (isValid) {
              const newUser: Pick<LocalUser, 'email' | 'passwordHash' | 'name'> = {
                name: existingUser.name,
                email: existingUser.email,
                passwordHash: existingUser.passwordHash
              };

              return Promise.resolve(newUser);
            }
          }
          return Promise.resolve(null);
        }
      }
    })
  ],
  callbacks: {
    async signIn(): Promise<boolean> {
      return true;
    },
    async redirect({ url, baseUrl }: RedirectProps): Promise<string> {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    async session({ session, token, newSession, trigger }: SessionProps): Promise<Session | DefaultSession> {
      session.user = { name: '', email: '', accessToken: '' };
      if (trigger === 'update' && newSession?.name) {
        session.accessToken = token.jti || '';
        session.user.name = newSession.name;
        session.user.email = newSession.email;
        session.user.accessToken = token.jti || '';
      } else if (session.user) {
        session.user.name = token?.name || '';
        session.user.email = token?.email || '';
        session.user.accessToken = token.jti || '';
        session.accessToken = token.jti || '';
      }

      return session;
    },
    async jwt({ token, user }: JWTProps): Promise<JWT> {
      if (user) {
        token.name = user.name || '';
        token.email = user.email || '';
      }

      return token;
    }
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/api/auth/signin',
    signOut: '/api/auth/signin',
    error: '/api/auth/error',
    verifyRequest: '/api/auth/signin'
  }
});

export { handler as GET, handler as POST, handler as signIn, handler as signOut };
