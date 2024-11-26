'use client';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { useQuery } from 'react-query';
import Origen from '../Origen';
import { RutaState, useFormularioStore } from '@/stores/formulario.store';
import { ProvinceEntity } from '@/interfaces/province';
import { retrieveProvinces } from '@/api/province';
import { roboto } from '@/themes';

const validationsSchema = yup.object({
  ruta: yup.object({
    origen: yup.string().required('El origen es requerido'),
    destino: yup.string().required('El destino es requerido'),
    comentario: yup.string().optional(),
    kms: yup
      .number()
      .required('Los KMS son requeridos')
      .min(1, 'Debe ser mayor a 0'),
  }),
});

const INITIAL_VALUES = {
  ruta: {
    origen: '',
    destino: '',
    comentario: '',
    kms: 0,
  },
};

export type RutaFormikProps = FormikProps<{
  ruta: {
    origen: string;
    destino: string;
    comentario: string;
    kms: number;
  };
}>;

interface Props {
  onClose: (ruta?: RutaState) => void;
}

export default function RutaDialog({ onClose }: Props) {
  const formularioStore = useFormularioStore();

  const findAllProvinces = useQuery<ProvinceEntity[]>(
    'findAllProvinces',
    retrieveProvinces,
  );

  const data = findAllProvinces.data ?? [];

  return (
    <Dialog
      open={formularioStore.toggleModalRuta}
      onClose={() => {
        onClose();
      }}
      PaperProps={{
        sx: {
          minWidth: '50%',
          minHeight: '300px',
          maxHeight: 'min-content',
        },
      }}
    >
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          const ruta: RutaState = {
            origen: values.ruta.origen,
            destino: values.ruta.destino,
            comentario: values.ruta.comentario,
            kms: values.ruta.kms,
          };

          onClose(ruta);
        }}
        validationSchema={validationsSchema}
      >
        {(formikProps) => {
          const isOrigenError = Boolean(
            formikProps.touched.ruta?.origen && formikProps.errors.ruta?.origen,
          );

          const isDestinoError = Boolean(
            formikProps.touched.ruta?.destino &&
              formikProps.errors.ruta?.destino,
          );

          return (
            <Form>
              <DialogTitle
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Typography variant="h5">Seleccionar Ruta</Typography>
              </DialogTitle>

              <DialogContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  width: '100%',
                  height: '100%',
                  minHeight: '80%',
                  minWidth: '80%',
                }}
              >
                <Origen
                  data={data}
                  selectProps={{
                    sx: {
                      width: '100%',
                      borderColor: isOrigenError ? 'red !important' : 'inherit',
                    },
                    onChange: formikProps.handleChange,
                    onBlur: formikProps.handleBlur,
                    name: 'ruta.origen',
                    MenuProps: {
                      sx: {
                        maxHeight: '400px',
                      },
                    },
                  }}
                  label="Origen"
                />

                <Origen
                  data={data}
                  selectProps={{
                    sx: {
                      width: '100%',
                      borderColor: isDestinoError ? 'red' : 'inherit',
                    },
                    onChange: formikProps.handleChange,
                    onBlur: formikProps.handleBlur,
                    name: 'ruta.destino',
                    MenuProps: {
                      sx: {
                        maxHeight: '400px',
                      },
                    },
                  }}
                  label="Destino"
                />

                <Divider />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                  }}
                >
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="Comentario"
                      minRows={5}
                      maxRows={10}
                      style={{
                        background: 'white',
                        color: 'black',
                        fontSize: '1rem',
                        ...roboto.style,
                        padding: '1rem',
                      }}
                      name="ruta.comentario"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                  </FormControl>

                  <TextField
                    label="KMS"
                    type="number"
                    sx={{
                      width: '200px',
                    }}
                    name="ruta.kms"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.ruta.kms}
                    error={
                      formikProps.touched.ruta?.kms &&
                      Boolean(formikProps.errors.ruta?.kms)
                    }
                    helperText={
                      formikProps.touched.ruta?.kms &&
                      formikProps.errors.ruta?.kms
                    }
                  />
                </Box>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cerrar
                </Button>
                <Button type="submit" variant="contained">
                  Aceptar
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}
