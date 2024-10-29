import Select from '@/components/Inputs/Select';
import { CombustibleValues, TransporteValues } from '@/interfaces/viaticos';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
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

      {/*Lugar de Visita */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.525rem',
        }}
      >
        <Typography variant="h6">Lugar de Visita</Typography>
        <Select
          label="Selecciona la sede"
          selectProps={{}}
          menuItemsProps={[]}
        />
        <Select
          label="Selecciona el punto de partida"
          selectProps={{}}
          menuItemsProps={[]}
        />
        <Select
          label="Seleccione el lugar de visita"
          selectProps={{}}
          menuItemsProps={[]}
        />

        <TextField label="Cantidad de Kilometros" />
        <TextField label="Precio Combustible" />
        <TextField label="Galones de Combustible" />
        <TextField label="Cantidad de efectivo" />
      </Box>

      {/*Hora  */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '.525rem',
        }}
      >
        <MobileTimePicker
          label="Hora de salida"
          openTo="hours"
          sx={{
            width: '100%',
          }}
        />
        <Typography variant="h6">-</Typography>
        <MobileTimePicker
          label="Hora de llegada"
          openTo="hours"
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
}

export default ViaticosForm;
