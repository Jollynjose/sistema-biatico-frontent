import ViaticosForm from '@/components/Forms/Viaticos';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';

function Home() {
  return (
    <DefaultLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.525rem',
        }}
      >
        {/* Title */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4">Formulario</Typography>

          <Button variant="contained" color="primary">
            <Typography variant="body1">Administrar Datos</Typography>
          </Button>
        </Box>
        <Divider />

        {/* Form */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ViaticosForm />
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default Home;
