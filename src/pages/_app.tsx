import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import type { AppProps } from 'next/app';
import Layout from '../shared/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}

export default MyApp;
