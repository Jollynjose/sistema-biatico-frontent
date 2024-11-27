import React, { FC } from 'react';
import { useUsers } from '@/hook/useUsers';
import { User } from '@/interfaces/user';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useJobPositions } from '@/hook/useJobPositions';
import DataTable from '../../components/DataTable';
import { Formik, Form, Field } from 'formik';
import LoadingBackdrop from '@/components/LoadingBackdrop';

interface UserForm {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  job_position_id: string;
}

const Users: FC = () => {
  const { users, isLoading, error, refetch, isRefetching } = useUsers();
  const { jobPositions } = useJobPositions();

  const handleSaveUser = async (
    user: { [key: string]: any },
    id: string,
    initialValues: { [key: string]: any },
  ) => {
    try {
      const updatedUser = Object.keys(user).reduce((acc, key) => {
        const value = user[key];

        if (user[key] !== initialValues[key]) {
          acc[key] = user[key];
        }
        return acc;
      }, {} as { [key: string]: any });

      if (Object.keys(updatedUser).length > 0) {
        await axios.put(`/api/user/${id}`, updatedUser);
        refetch();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const columns = [
    {
      header: 'Nombre',
      accessor: 'first_name',
      render: (user: User) => `${user.first_name} ${user.last_name}`,
    },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Job Position',
      accessor: 'job_position_id',
      render: (user: User) =>
        jobPositions?.find((i) => i.id === user.job_position_id)?.name || 'N/A',
    },
    { header: 'Rol', accessor: 'role' },
  ];

  const collapsibleContent = (user: User) => (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <h3>Editar Usuario</h3>
      <Formik
        initialValues={{
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          role: user.role || '',
          job_position_id: user.job_position_id || '',
        }}
        onSubmit={(values) => handleSaveUser(values, user.id, user)}
      >
        {({ handleChange, values }) => (
          <Form>
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: '100%' }}
              marginTop={2}
            >
              <Field
                name="first_name"
                as={TextField}
                label="Nombre"
                fullWidth
                margin="normal"
              />
              <Field
                name="last_name"
                as={TextField}
                label="Apellido"
                fullWidth
                margin="normal"
              />
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Rol</InputLabel>
                <Field
                  name="role"
                  as={Select}
                  value={values.role}
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </Field>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Job Position</InputLabel>
                <Field
                  name="job_position_id"
                  as={Select}
                  value={values.job_position_id}
                  onChange={handleChange}
                >
                  {jobPositions?.map((i) => (
                    <MenuItem key={i.id} value={i.id}>
                      {i.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <Button type="submit">Guardar</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );

  if (isLoading || isRefetching) return <LoadingBackdrop />;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <DataTable
        data={users!}
        columns={columns}
        collapsibleContent={collapsibleContent}
      />
    </div>
  );
};

export default Users;
