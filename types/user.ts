export interface LocalUser {
  email?: string;
  password?: string;
  name?: string;
  body?: any;
  confirmPassword?: string;
  accessToken?: string;
  accessTokenExpires?: string;
  sessionToken?: string;
  refreshToken?: string;
  refreshTokenExpires?: string;
  status?: string;
  expires?: string;
  signOut?: () => void;
  signIn?: () => void;
  passwordHash?: string;
}

export interface SessionPartialUser {
  name: string;
  email: string;
}
