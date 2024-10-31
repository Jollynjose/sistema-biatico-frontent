import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { Box } from '@mui/material';

function DefaultLayout({ children }: PropsWithChildren) {
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
      </Box>
    </Box>
  );
}

export default DefaultLayout;
