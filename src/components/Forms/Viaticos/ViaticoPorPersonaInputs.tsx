import InputFieldWithDeactivateButton from '@/components/Inputs/InputFieldWithDeactivateButton';
import Select from '@/components/Inputs/Select';
import { Box, TextField } from '@mui/material';
import React from 'react';

function ViaticoPorPersonaInputs() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.525rem',
        width: '100%',
      }}
    >
      <Select label="Puesto" selectProps={{}} menuItemsProps={[]}></Select>

      <TextField label="Cargo" />

      <TextField label="Nombre Completo" />

      <InputFieldWithDeactivateButton
        textFieldProps={{ label: 'Desayuno', disabled: true }}
        switchProps={{ checked: true }}
      />

      <InputFieldWithDeactivateButton
        textFieldProps={{ label: 'Almuerzo', disabled: true }}
        switchProps={{ checked: true }}
      />

      <InputFieldWithDeactivateButton
        textFieldProps={{ label: 'Cena', disabled: true }}
        switchProps={{ checked: true }}
      />

      <InputFieldWithDeactivateButton
        textFieldProps={{ label: 'Alojamiento' }}
        switchProps={{ checked: true }}
      />

      <TextField label="Pasaje" type="number" />

      <TextField label="Total" type="number" disabled />
    </Box>
  );
}

export default ViaticoPorPersonaInputs;
