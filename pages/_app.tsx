import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../components/navigation';
import TopHeader from '../components/topheader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopHeader />
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
