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
            gap: { xs: '1rem', md: '0' },
          }}
        >
          <Typography variant="h4">Formulario</Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 'min-content',
            }}
          >
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
            padding: { xs: '0rem 0rem 1rem 0rem', md: '0rem 1rem 1rem 1rem' },
          }}
        >
          <ViaticosForm />
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default Home;
