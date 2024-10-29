import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { Box } from '@mui/material';

function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
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
    </>
  );
}

export default DefaultLayout;
