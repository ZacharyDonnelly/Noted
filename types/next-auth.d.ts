import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    expires: string;
    signOut?: () => void;
    status?: string;
    user: {
      email?: string | undefined;
      name?: string | undefined;
      accessToken?: string | undefined;
    };
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
