import type { AppProps } from 'next/app';
import RootLayout from './layout';

const App = ({ Component, pageProps }: AppProps) => (
  <RootLayout>
    <Component {...pageProps} /> {/* eslint-disable-line react/jsx-props-no-spreading */}
  </RootLayout>
);

export default App;
