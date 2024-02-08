import AuthProvider from '@/components/context/authProvider';
import Navbar from '@/components/navbar/navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notebook',
  description: 'Notebook by Zach Donnelly'
};

const RootLayout = ({
  children
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <AuthProvider>
      <body className={inter.className}>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </AuthProvider>
  </html>
);

export default RootLayout;
