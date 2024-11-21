import Provider from '@/components/Provider';
import '@/styles/globals.css';
import theme from '@/themes';
import { CssBaseline } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { AppProps } from 'next/app';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function App({
  Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider client={queryClient} theme={theme} dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}

