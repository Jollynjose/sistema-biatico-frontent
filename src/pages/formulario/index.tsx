import { retrieveFuel } from '@/api/fuel';
import { retrieveUsers } from '@/api/user';
import ViaticosForm from '@/components/Forms/Viaticos';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import LoadingBackdrop from '@/components/LoadingBackdrop';
import { FuelHistory } from '@/interfaces/fuel';
import { UserEntity } from '@/interfaces/users';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';

function Home() {
  const findUsersQuery = useQuery<UserEntity[]>(
    'findUsersQuery',
    retrieveUsers,
  );
  const findFuelQuery = useQuery<FuelHistory[]>('findFuelQuery', retrieveFuel);

  if (findUsersQuery.isLoading || findFuelQuery.isLoading) {
    return <LoadingBackdrop />;
  }

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
