import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { userFields } from '@/shared/userFields';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signinValidationSchema } from '../helper/validations';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const loginFields = userFields.filter(field => ["email", "password"].includes(field)).reverse();

const capitalizeAndReplace = (input: string) => {
  const firstCharacterPattern = /^./;
  return input.replaceAll('_', ' ').replace(firstCharacterPattern, char => char.toUpperCase());
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 90dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function Signin() {
  const router = useRouter();
  const { status } = useSession();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') router.push('/dashboard');
  }, [status, router]);

  const handleSubmit = async (values: { email: string, password: string }) => {
    setAuthError(null); // Reset error state
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      setAuthError("Invalid email or password. Please try again.");
    }

    if (res?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <DefaultLayout>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signinValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Box
                component="div"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                {loginFields.map((inputField, index) => (
                  <FormControl key={index}>
                    <FormLabel htmlFor={inputField}>{capitalizeAndReplace(inputField)}</FormLabel>
                    <Field
                      as={TextField}
                      autoComplete={inputField}
                      name={inputField}
                      required
                      fullWidth
                      id={inputField}
                      type={inputField}
                    />

                    <ErrorMessage
                      component="div"
                      style={{ color: 'red' }}
                      name={inputField}
                    />
                  </FormControl>
                ))}

                {authError && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ marginBottom: 2 }}
                  >
                    {authError}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Sign in
                </Button>
              </Box>
            </Form>
          </Formik>
        </Card>
      </SignUpContainer>
    </DefaultLayout>
  );
}

export default Signin;

