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
    } & DefaultSession['user']; // eslint-disable-line @typescript-eslint/no-redundant-type-constituents
    expires: string;
  }

  interface User {
    accessToken: string;
    email: string;
    name: string;
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
