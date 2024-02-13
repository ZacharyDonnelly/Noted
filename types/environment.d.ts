declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly GOOGLE_ID: string;
    readonly GOOGLE_SECRET: string;
    readonly GITHUB_ID: string;
    readonly GITHUB_SECRET: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
    readonly JWT_SECRET: string;
  }
}

declare module 'next-offline';
