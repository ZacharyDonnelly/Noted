import SessionProvider from '@/components/context/sessionProvider';
import Navbar from '@/components/navbar/navbar';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Noted - Personal blog w/ real time trans',
  description: 'Notebook by Zach Donnelly'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main>
            <Navbar />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
