import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    accessTokenExpires?: string;
    sessionToken?: string;
    refreshToken?: string;
    refreshTokenExpires?: string;
    status?: string;
    user: {
      /** The user's access token. */
      accessToken: string;
      email: string | undefined;
      name: string | undefined;
      emailVerified?: boolean;
    } & DefaultSession['user']; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
    expires: string;
  }

  interface User {
    id: string | number;
    accessToken?: string;
    email: string;
    name: string;
    emailVerified?: boolean;
  }

  interface Account {
    id: number;
    userId: number;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
  }

  interface Profile {
    id: string | number;
    name: string;
    email: string;
    image: string;
    email_verified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    refreshTokenExpires?: number;
    refreshToken?: string;
    accessTokenExpires?: number;
    accessToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
    name?: string;
    email?: string;
  }
}
