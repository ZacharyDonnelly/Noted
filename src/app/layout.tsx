import AuthProvider from '@/components/context/authProvider';
import Navbar from '@/components/navbar/navbar';
import type { Metadata, Viewport } from 'next';
import type { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './styles/globals.scss';

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Noted',
    default: 'Noted'
  },
  category: 'Personal work productivity application',
  authors: { name: 'Zach Donnelly<mail@zachdonnelly.com>', url: 'http://localhost:3000' },
  creator: 'Zach Donnelly<mail@zachdonnelly.com>',
  publisher: 'Zach Donnelly',
  generator: 'Next.js',
  applicationName: 'Noted',
  referrer: 'origin-when-cross-origin',
  // verification: {
  //   google: 'google',
  //   other: {
  //     me: ['mail@zachdonnelly.com']
  //   }
  // },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  keywords: [
    'Next.js',
    'Next 14',
    'Next-Auth',
    'React',
    'React server components',
    'React client components',
    'React hooks',
    'TypeScript',
    'Jest',
    'SASS',
    'Prisma',
    'Cypress',
    'Docker',
    'sqlite',
    'sqlite3',
    'classnames',
    'Google',
    'Github',
    'JavaScript',
    'Noted',
    'Blog',
    'Personal Blog',
    'Real-Time Transcription'
  ]
};

export const viewport: Viewport = {
  width: 'device-width'
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
