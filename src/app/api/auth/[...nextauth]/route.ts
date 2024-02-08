import NextAuth from 'next-auth/next';
import authOptions from '../authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as signIn, handler as update };
