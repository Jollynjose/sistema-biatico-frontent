import { CombustibleValues, TransporteValues } from '@/interfaces/viaticos';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import ViaticoPorPersonaInputs from './ViaticoPorPersonaInputs';
import { useFormik } from 'formik';
import ViaticosSchema, { ViaticosSchemaType } from './Viaticos.schema';
import RutaDialog from '../Rutas';

const initialValues = {
  people: [],
  tolls: [],
  solicitudeDate: null,
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
  departureTime: null,
  arrivalTime: null,
};

function ViaticosForm() {
  const [toggleRouteModal, setToggleRouteModal] = useState(false);

  const onSubmitHandler = () => {};

  const formik = useFormik({
    initialValues: initialValues as unknown as ViaticosSchemaType,
    validationSchema: ViaticosSchema,
    onSubmit: onSubmitHandler,
  });

  console.log(formik.values);

  return (
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
      <DatePicker
        label="Fecha de Solicitud"
        name="solicitudeDate"
        onChange={(date) => {
          formik.setFieldValue('solicitudeDate', date?.toDate() ?? null);
          formik.setFieldTouched('solicitudeDate', true);
        }}
      />

      <TextField
        label="Dependencia"
        name="dependency"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.dependency}
        error={formik.touched.dependency && Boolean(formik.errors.dependency)}
        helperText={formik.touched.dependency && formik.errors.dependency}
      />

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
            defaultValue={TransporteValues.INSTITUCIONAL}
            row
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.transportation}
            name="transportation"
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
          <FormLabel id="demo-radio-buttons-group-label">Combustible</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={CombustibleValues.GASOLINA}
            row
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fuel}
            name="fuel"
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
      <Divider />

      {/*Lugar de Visita */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.525rem',
        }}
      >
        <Typography variant="h6">Lugar de Visita</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '.525rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1">Seleccione Una ruta</Typography>
          <Button
            variant="contained"
            onClick={() => setToggleRouteModal((prev) => !prev)}
          >
            Seleccionar Ruta
          </Button>
        </Box>
        {/* <Select
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
        <TextField label="Cantidad de efectivo" /> */}
      </Box>

      <Divider />

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

      <RutaDialog
        open={toggleRouteModal}
        onClose={() => setToggleRouteModal(false)}
      />
    </Box>
  );
}

export default ViaticosForm;
