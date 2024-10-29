import { CombustibleValues, TransporteValues } from '@/interfaces/viaticos';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';

function ViaticosForm() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.525rem',
        width: '50%',
      }}
    >
      <DatePicker label="Fecha de Solicitud" />

      <TextField label="Dependencia" />

      <TextField label="Motivo de Visita" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {/* Transporte */}
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Transporte</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={TransporteValues.INSTITUCIONAL}
            row
          >
            <FormControlLabel
              value={TransporteValues.INSTITUCIONAL}
              control={<Radio />}
              label="Institucional"
            />
            <FormControlLabel
              value={TransporteValues.PARTICULAR}
              control={<Radio />}
              label="Particular"
            />
          </RadioGroup>
        </FormControl>

        {/* Combustible */}
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Combustible</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={CombustibleValues.GASOLINA}
            row
          >
            <FormControlLabel
              value={CombustibleValues.GASOLINA}
              control={<Radio />}
              label="Gasolina"
            />
            <FormControlLabel
              value={CombustibleValues.GASOIL}
              control={<Radio />}
              label="Gasoil"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}

export default ViaticosForm;
