import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import { useUIStore } from '@/stores/ui.store';
import LoadingBackdrop from '../LoadingBackdrop';

function DefaultLayout({ children }: PropsWithChildren) {
  const uiStore = useUIStore();

  return (
    <Box>
      <Header />
      <Box
        component="main"
        sx={{
          paddingX: '3rem',
          boxSizing: 'content-box',
        }}
      >
        {children}

        {uiStore.toggleLoading && <LoadingBackdrop />}
      </Box>
    </Box>
  );
}

export default DefaultLayout;
