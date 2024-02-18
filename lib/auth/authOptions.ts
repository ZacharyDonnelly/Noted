import { INTERVAL, UNIQUE_TOKEN_PER_INTERVAL } from '@/constants/rateLimit';
import type {
  AuthOptions,
  DefaultSession,
  JWT,
  JWTProps,
  RedirectProps,
  Session,
  SessionProps,
  User
} from '@/types/api/callbacks';
import rateLimit from '@/utils/api/rate-limit';
import prismadb from '@/utils/prisma/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const limiter = rateLimit({
  interval: INTERVAL,
  uniqueTokenPerInterval: UNIQUE_TOKEN_PER_INTERVAL
});

const prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> = new PrismaClient();

const handler: AuthOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    // TODO: Refactor google oauth provider to handle state cookies errors
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email Address', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials): Promise<User> {
        if (!credentials?.email || !credentials?.password) {
          console.error('Information is not available. Could not log you in. Please try again later.');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true
          }
        });
        if (user) {
          const isMatch = await bcrypt.compare(credentials?.password as string, user.password as string);

          if (isMatch) {
            const isValid: boolean = bcrypt.compareSync(credentials?.password as string, user.password as string);

            if (!isValid) {
              throw new Error('Invalid password!');
            }

            return { id: user.id, name: user.name, email: user.email };
          }
        }
        return { id: '', name: '', email: '' };
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

export { handler as GET, handler as POST };
