import { Formik, Field, Form, ErrorMessage } from 'formik';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { SetStateAction } from 'react';
import axios from 'axios';
import { User } from '@/interfaces/user';
import { useJobPositions } from '@/hook/useJobPositions';
import { JobPosition } from '@/interfaces/job-position';
import { defaultValues } from '@/helpers/defaultValues';
import { signupValidationSchema } from '@/helpers/validations';

interface SignupFormProps {
  setSnackbar: SetStateAction<any>;
}

interface UserFields extends User {
  job_position: string;
  confirm_password: string;
}

type UserObject = Omit<UserFields, 'job_position_id'>;

const SignupForm: React.FC<SignupFormProps> = ({ setSnackbar }) => {
  const { jobPositions } = useJobPositions();

  const handleSubmit = async (values: UserObject) => {
    const { confirm_password, job_position, ...rest } = values;

    try {
      const response = await axios.post('/api/auth/signup', {
        ...rest,
        job_position_id: job_position,
      });

      setSnackbar({
        open: true,
        message: 'Registration successful!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error during registration.',
        severity: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={defaultValues as UserObject}
      validationSchema={signupValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="first_name">First name</FormLabel>
            <Field
              name="first_name"
              as={TextField}
              fullWidth
              id="first_name"
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="last_name">Last name</FormLabel>
            <Field
              name="last_name"
              as={TextField}
              fullWidth
              id="last_name"
              required
            />
          </FormControl>
        </Stack>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Field
            name="email"
            as={TextField}
            type="email"
            fullWidth
            id="email"
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Field
            name="password"
            as={TextField}
            type="password"
            fullWidth
            id="password"
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
          <Field
            name="confirm_password"
            as={TextField}
            type="password"
            fullWidth
            id="confirm_password"
            required
          />
          <ErrorMessage name="confirm_password" component="div" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Field
            name="role"
            as={Select}
            labelId="role-label"
            label="Role"
            fullWidth
            required
            id="role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="general">General</MenuItem>
          </Field>
        </FormControl>

        {/* Campo de selección para Job Position */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="job_position-label">Job Position</InputLabel>
          <Field
            name="job_position"
            as={Select}
            labelId="job_position-label"
            label="Job Position"
            fullWidth
            required
            id="job_position"
          >
            {jobPositions?.map((i: JobPosition) => (
              <MenuItem key={i.id} value={i.id}>
                {i.name}
              </MenuItem>
            ))}
          </Field>

          <ErrorMessage name="job_position" component="div" />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Sign Up
        </Button>
      </Form>
    </Formik>
  );
};

export default SignupForm;
