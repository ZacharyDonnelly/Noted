import Navbar from '@/components/navbar/navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notebook',
  description: 'Notebook by Zach Donnelly'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <Navbar />
      {children}
    </body>
  </html>
);

export default RootLayout;
