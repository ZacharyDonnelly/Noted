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
    <body className={inter.className}>
      <AuthProvider>
        <main>
          <Navbar />
          {children}
        </main>
      </AuthProvider>
    </body>
  </html>
);

export default RootLayout;
