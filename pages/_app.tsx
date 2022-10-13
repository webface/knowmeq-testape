import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QuizContext } from '../context/QuizContext';
import useQuizContextValue from '../hooks/useQuizContextValue';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
