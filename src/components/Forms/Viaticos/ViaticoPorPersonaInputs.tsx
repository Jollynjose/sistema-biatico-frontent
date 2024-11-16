import InputFieldWithDeactivateButton from '@/components/Inputs/InputFieldWithDeactivateButton';
import { Box, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { ViaticosSchemaType } from './Viaticos.schema';

interface Props {
  formik: FormikProps<ViaticosSchemaType>;
  index: number;
}

function ViaticoPorPersonaInputs({ formik, index }: Props) {
  const person = formik.values.people[index];

  console.log(person);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.525rem',
        width: '100%',
      }}
    >
      <TextField label="Nombre Completo" disabled value={person.fullName} />

      <TextField label="Puesto" disabled value={person.position} />

      <TextField label="Cargo" disabled value={person.employeeName} />

      <InputFieldWithDeactivateButton
        textFieldProps={{
          label: 'Desayuno',
          disabled: true,

          value: person.breakfast,
        }}
        switchProps={{
          name: `people[${index}].isBreakfastActive`,
          onChange: (e) => {
            const value = e.target.checked;

            formik.setFieldValue(`people[${index}].isBreakfastActive`, value);

            if (value) {
              // Sum the breakfast value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total + person.breakfast,
              );
            } else {
              // Subtract the breakfast value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total - person.breakfast,
              );
            }
          },
          onBlur: () => {
            formik.setFieldTouched(`people[${index}].isBreakfastActive`, true);
          },
          checked: person.isBreakfastActive,
        }}
      />

      <InputFieldWithDeactivateButton
        textFieldProps={{
          label: 'Almuerzo',
          disabled: true,
          value: person.lunch,
        }}
        switchProps={{
          name: `people[${index}].isLunchActive`,
          onChange: (e) => {
            const value = e.target.checked;

            formik.setFieldValue(`people[${index}].isLunchActive`, value);

            if (value) {
              // Sum the lunch value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total + person.lunch,
              );
            } else {
              // Subtract the lunch value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total - person.lunch,
              );
            }
          },
          onBlur: () => {
            formik.setFieldTouched(`people[${index}].isLunchActive`, true);
          },
          checked: person.isLunchActive,
        }}
      />

      <InputFieldWithDeactivateButton
        textFieldProps={{ label: 'Cena', disabled: true, value: person.dinner }}
        switchProps={{
          name: `people[${index}].isDinnerActive`,
          onChange: (e) => {
            const value = e.target.checked;

            formik.setFieldValue(`people[${index}].isDinnerActive`, value);

            if (value) {
              // Sum the dinner value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total + person.dinner,
              );
            } else {
              // Subtract the dinner value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total - person.dinner,
              );
            }
          },
          onBlur: () => {
            formik.setFieldTouched(`people[${index}].isDinnerActive`, true);
          },
          checked: person.isDinnerActive,
        }}
      />

      <InputFieldWithDeactivateButton
        textFieldProps={{
          label: 'Alojamiento',
          disabled: true,
          value: person.accommodation,
        }}
        switchProps={{
          checked: person.isAccommodationActive,
          name: `people[${index}].isAccommodationActive`,
          value: person.isAccommodationActive,
          onChange: (e) => {
            const value = e.target.checked;

            formik.setFieldValue(
              `people[${index}].isAccommodationActive`,
              value,
            );

            if (value) {
              // Sum the accommodation value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total + person.accommodation,
              );
            } else {
              // Subtract the accommodation value
              formik.setFieldValue(
                `people[${index}].total`,
                person.total - person.accommodation,
              );
            }
          },
          onBlur: () => {
            formik.setFieldTouched(
              `people[${index}].isAccommodationActive`,
              true,
            );
          },
        }}
      />

      <TextField
        label="Pasaje"
        type="number"
        name={`people.[${index}].passage`}
        value={person.passage}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (value < 0 || Number.isNaN(value)) return;

          formik.handleChange(e);

          const total = person.total - person.passage + Number(value);

          formik.setFieldValue(`people[${index}].total`, total);
        }}
        onBlur={formik.handleBlur}
      />

      <TextField label="Total" type="number" disabled value={person.total} />
    </Box>
  );
}

export default ViaticoPorPersonaInputs;
