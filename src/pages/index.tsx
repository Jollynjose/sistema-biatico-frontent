import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import logo from '@public/images/logo.jpg';
import { ROUTES } from '@/interfaces/auth';

export default function Home() {
  return (
    <DefaultLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: logo.width,
            height: logo.height,
          }}
        >
          <Image src={logo.src} alt="Logo" layout="fill" />
        </Box>

        <Box
          sx={{
            width: 'max-content',
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
          }}
        >
          <Button variant="contained" color="primary">
            <Link href={ROUTES.FORMULARIO} passHref>
              <Typography variant="body1">Formulario</Typography>
            </Link>
          </Button>

          <Button variant="contained" color="primary">
            <Link href={ROUTES.ACTUALIZAR_DATOS} passHref>
              <Typography variant="body1">Actualizar Datos</Typography>
            </Link>
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
}
