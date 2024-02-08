import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import RootLayout from './layout';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <RootLayout>
    <SessionProvider session={session}>
      <Component {...pageProps} /> {/* eslint-disable-line react/jsx-props-no-spreading */}
    </SessionProvider>
  </RootLayout>
);

export default App;
