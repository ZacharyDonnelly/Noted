import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    accessTokenExpires?: string;
    sessionToken?: string;
    refreshToken?: string;
    expires: string;
    signOut?: () => void;
    signIn?: () => void;
    status?: string;
    user: User & DefaultUser['user'];
  }

  interface User {
    email?: string | undefined;
    name?: string | undefined;
    accessToken?: string | undefined;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    accessToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
    name?: string;
    email?: string;
  }
}
