import { useJobPositions } from '@/hook/useJobPositions';
import { JobPosition } from '@/interfaces/job-position';
import { Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import DataTable from './components/DataTable';
import { Formik, Form, Field } from 'formik';
import LoadingBackdrop from '@/components/LoadingBackdrop';

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
    render: (jobPosition: JobPosition) => getLatestHistory(jobPosition)?.breakfast,
  },
  {
    header: 'Cena',
    accessor: 'job_position_histories',
    render: (jobPosition: JobPosition) => getLatestHistory(jobPosition)?.dinner,
  },
  {
    header: 'Alojamiento',
    accessor: 'job_position_histories',
    render: (jobPosition: JobPosition) => getLatestHistory(jobPosition)?.accommodation,
  },
];

const JobPositionsPage: React.FC = () => {
  const { jobPositions, isLoading, error, refetch, isRefetching } = useJobPositions();

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

  if (isLoading || isRefetching) return <LoadingBackdrop />
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <DataTable
        columns={columns}
        data={jobPositions!}
        collapsibleContent={(jobPosition: JobPosition) => (
          <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }} >
            <h2>Editar Posición de Trabajo</h2>
            <Formik
              initialValues={{
                lunch: getLatestHistory(jobPosition)?.lunch || 0,
                breakfast: getLatestHistory(jobPosition)?.breakfast || 0,
                dinner: getLatestHistory(jobPosition)?.dinner || 0,
                accommodation: getLatestHistory(jobPosition)?.accommodation || 0,
              }}
              onSubmit={(values) => handleSaveJobPosition(values, jobPosition.id)}
            >
              {({ handleChange, values }) => (
                <Form>
                  <Stack direction="row" spacing={2} sx={{ width: '100%' }} marginTop={2}>
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
      />
    </div>
  );
};

export default JobPositionsPage;

