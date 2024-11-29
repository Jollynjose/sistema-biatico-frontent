import { useJobPositions } from '@/hook/useJobPositions';
import { JobPosition } from '@/interfaces/job-position';
import {
  Button,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  Box,
} from '@mui/material';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import { Formik, Form, Field } from 'formik';
import LoadingBackdrop from '@/components/LoadingBackdrop';
import { useState } from 'react';
import * as yup from 'yup';

const getLatestHistory = (jobPosition: JobPosition) => {
  return jobPosition.job_position_histories.at(-1);
};

const columns = [
  { header: 'Posición', accessor: 'name' },
  {
    header: 'Almuerzo',
    accessor: 'job_position_histories',
    render: (jobPosition: JobPosition) => getLatestHistory(jobPosition)?.lunch,
  },
  {
    header: 'Desayuno',
    accessor: 'job_position_histories',
    render: (jobPosition: JobPosition) =>
      getLatestHistory(jobPosition)?.breakfast,
  },
  {
    header: 'Cena',
    accessor: 'job_position_histories',
    render: (jobPosition: JobPosition) => getLatestHistory(jobPosition)?.dinner,
  },
  {
    header: 'Alojamiento',
    accessor: 'job_position_histories',
    render: (jobPosition: JobPosition) =>
      getLatestHistory(jobPosition)?.accommodation,
  },
];

const JobPositionsPage: React.FC = () => {
  const {
    jobPositions,
    isLoading,
    error,
    refetch,
    isRefetching,
    createJobPositionHandler,
    isCreating,
  } = useJobPositions();

  const [openCreateJobPosition, setOpenCreateJobPosition] = useState(false);

  const handleSaveJobPosition = async (formValues: any, id: string) => {
    const payload = {
      job_position_id: id,
      ...formValues,
    };

    try {
      await axios.post(`/api/job-position/update-job-position`, payload);
      refetch();
    } catch (error) {
      console.error('Error updating job position:', error);
    }
  };

  if (isLoading || isRefetching || isCreating) return <LoadingBackdrop />;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={jobPositions!}
        collapsibleContent={(jobPosition: JobPosition) => (
          <div
            style={{
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <h2>Editar Posición de Trabajo</h2>
            <Formik
              initialValues={{
                lunch: getLatestHistory(jobPosition)?.lunch || 0,
                breakfast: getLatestHistory(jobPosition)?.breakfast || 0,
                dinner: getLatestHistory(jobPosition)?.dinner || 0,
                accommodation:
                  getLatestHistory(jobPosition)?.accommodation || 0,
              }}
              onSubmit={(values) =>
                handleSaveJobPosition(values, jobPosition.id)
              }
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
                      name="lunch"
                      as={TextField}
                      label="Almuerzo"
                      type="number"
                      fullWidth
                      onChange={handleChange}
                      value={values.lunch}
                      margin="normal"
                    />
                    <Field
                      name="breakfast"
                      as={TextField}
                      label="Desayuno"
                      type="number"
                      fullWidth
                      onChange={handleChange}
                      value={values.breakfast}
                      margin="normal"
                    />
                    <Field
                      name="dinner"
                      as={TextField}
                      label="Cena"
                      type="number"
                      fullWidth
                      onChange={handleChange}
                      value={values.dinner}
                      margin="normal"
                    />
                    <Field
                      name="accommodation"
                      as={TextField}
                      label="Alojamiento"
                      type="number"
                      fullWidth
                      onChange={handleChange}
                      value={values.accommodation}
                      margin="normal"
                    />
                    <Button type="submit">Guardar</Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </div>
        )}
        addCreateButton
        onCreate={() => {
          setOpenCreateJobPosition(true);
        }}
      />

      <Dialog
        open={openCreateJobPosition}
        onClose={() => setOpenCreateJobPosition(false)}
        PaperProps={{
          sx: {
            minWidth: '50%',
            minHeight: '300px',
            maxHeight: 'min-content',
            padding: '20px',
          },
        }}
      >
        <DialogTitle>Crear Posición de Trabajo</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            lunch: 0,
            breakfast: 0,
            accommodation: 0,
            dinner: 0,
          }}
          onSubmit={(values) => {
            const request = {
              name: values.name,
              job_position_histories: [
                {
                  lunch: values.lunch,
                  breakfast: values.breakfast,
                  dinner: values.dinner,
                  accommodation: values.accommodation,
                },
              ],
            };
            createJobPositionHandler(request);
            setOpenCreateJobPosition(false);
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required('Este campo es requerido'),
            lunch: yup
              .number()
              .required('Este campo es requerido')
              .min(0, 'Debe ser mayor a 0'),
            breakfast: yup
              .number()
              .required('Este campo es requerido')
              .min(0, 'Debe ser mayor a 0'),
            dinner: yup
              .number()
              .required('Este campo es requerido')
              .min(0, 'Debe ser mayor a 0'),
            accommodation: yup
              .number()
              .required('Este campo es requerido')
              .min(0, 'Debe ser mayor a 0'),
          })}
        >
          {(props) => {
            const { handleChange, values, errors, touched } = props;

            return (
              <Form>
                <Field
                  name="name"
                  as={TextField}
                  label="Nombre"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  value={values.name}
                  margin="normal"
                  error={Boolean(errors.name) && touched.name}
                  helperText={errors.name ?? ''}
                />
                <Field
                  name="lunch"
                  as={TextField}
                  label="Almuerzo"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={values.lunch}
                  margin="normal"
                  error={Boolean(errors.lunch) && touched.lunch}
                  helperText={errors.lunch ?? ''}
                />
                <Field
                  name="breakfast"
                  as={TextField}
                  label="Desayuno"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={values.breakfast}
                  margin="normal"
                  error={Boolean(errors.breakfast) && touched.breakfast}
                  helperText={errors.breakfast ?? ''}
                />
                <Field
                  name="dinner"
                  as={TextField}
                  label="Cena"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={values.dinner}
                  margin="normal"
                  error={Boolean(errors.dinner) && touched.dinner}
                  helperText={errors.dinner ?? ''}
                />
                <Field
                  name="accommodation"
                  as={TextField}
                  label="Alojamiento"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={values.accommodation}
                  margin="normal"
                  error={Boolean(errors.accommodation) && touched.accommodation}
                  helperText={errors.accommodation ?? ''}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    gap: '8px',
                  }}
                >
                  <Button type="submit" variant="contained">
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setOpenCreateJobPosition(false)}
                  >
                    Cerrar
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};

export default JobPositionsPage;
