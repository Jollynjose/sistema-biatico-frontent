import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Box } from '@mui/material';
import React from 'react';

function Home() {
  return (
    <DefaultLayout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        Actualizar Datos
      </Box>
    </DefaultLayout>
  );
}

export default Home;
