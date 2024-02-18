import type { AuthOptions, DefaultSession, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import type { JWT } from 'next-auth/jwt';

type LocUser = {
  id?: number;
  email: string;
  passwordHash: string;
  name: string;
} | null;

type RedirectProps = { url: string; baseUrl: string };
type SessionProps = { session: Session; token: JWT; trigger: string; newSession?: any };
type JWTProps = { token: JWT; user: User | AdapterUser };

export type { AuthOptions, DefaultSession, JWT, JWTProps, LocUser, RedirectProps, Session, SessionProps, User };
