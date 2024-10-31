import Select from '@/components/Inputs/Select';
import { CombustibleValues, TransporteValues } from '@/interfaces/viaticos';
import {
  Box,
  Button,
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
import ViaticoPorPersonaInputs from './ViaticoPorPersonaInputs';
import { Formik } from 'formik';
import ViaticosSchema, { ViaticosSchemaType } from './Viaticos.schema';

const initialValues: ViaticosSchemaType = {
  people: [],
  tolls: [],
  solicitudeDate: new Date(),
  visitMotivation: '',
  dependency: '',
  transportation: TransporteValues.INSTITUCIONAL,
  fuel: CombustibleValues.GASOLINA,
  site: '',
  startPoint: '',
  visitPlace: '',
  kilometers: 0,
  fuelPrice: 0,
  fuelGallons: 0,
  cashAmount: 0,
  departureTime: new Date(),
  arrivalTime: new Date(),
};

function ViaticosForm() {
  const onSubmitHandler = (values: ViaticosSchemaType) => {};

  return (
    <Formik
      onSubmit={onSubmitHandler}
      initialValues={initialValues}
      validationSchema={ViaticosSchema}
    >
      {(formik) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.525rem',
            width: { xs: '100%', md: '50%' },
            overflow: 'hidden',
          }}
          component="form"
          onSubmit={formik.handleSubmit}
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
              <FormLabel id="demo-radio-buttons-group-label">
                Transporte
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={TransporteValues.INSTITUCIONAL}
                row
              >
                <FormControlLabel
                  value={TransporteValues.INSTITUCIONAL}
                  control={<Radio />}
                  label="Institucional"
                  name="transportation"
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
              <FormLabel id="demo-radio-buttons-group-label">
                Combustible
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={CombustibleValues.GASOLINA}
                row
              >
                <FormControlLabel
                  value={CombustibleValues.GASOLINA}
                  control={<Radio />}
                  label="Gasolina"
                  name="fuel"
                />
                <FormControlLabel
                  value={CombustibleValues.GASOIL}
                  control={<Radio />}
                  label="Gasoil"
                  name="fuel"
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

          <Box>
            <Typography variant="h6">Solicitud por personas</Typography>

            <ViaticoPorPersonaInputs />
          </Box>

          <TextField label="Peaje 1" type="number" disabled />
          <TextField label="Peaje Total" type="number" disabled />

          <Button variant="contained" type="submit">
            <Typography variant="body1">Guardar</Typography>
          </Button>
        </Box>
      )}
    </Formik>
  );
}

export default ViaticosForm;
