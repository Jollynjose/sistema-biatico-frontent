import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

function LoadingBackdrop() {
  return (
    <Backdrop
      open
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress />
    </Backdrop>
  );
}

export default LoadingBackdrop;
