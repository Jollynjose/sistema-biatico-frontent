'use client';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import { FieldArray, Form, Formik, FormikProps } from 'formik';
import AddButton from '@/components/Buttons/AddButton';
import RemoveButton from '@/components/Buttons/RemoveButton';
import { useQuery } from 'react-query';
import { MunicipalityEntity } from '@/interfaces/municipality';
import { getMunicipalities } from '@/api';
import Origen from '../Origen';
import RutaInput from '@/components/Inputs/ParadaInput';
import { useFormularioStore } from '@/stores/formulario.store';

const retrieveMunicipalities = async () => {
  const response = await getMunicipalities();
  return response?.results ?? [];
};

const validationsSchema = yup.object({
  ruta: yup.object({
    origen: yup.string().required('El origen es requerido'),
    paradas: yup
      .array()
      .of(
        yup.object({
          municipioId: yup
            .string()
            .required('El municipio es requerido')
            .nullable(),
          kms: yup
            .number()
            .required('Los kilometros son requeridos')
            .min(0)
            .default(0),
          id: yup
            .string()
            .required('El id es requerido')
            .default(Math.random().toString(36).substring(7)),
        }),
      )
      .min(1),
  }),
});

const INITIAL_VALUES = {
  ruta: {
    origen: '',
    paradas: [
      {
        municipioId: '',
        kms: 0,
        id: Math.random().toString(36).substring(7),
      },
    ],
  },
};

export type RutaFormikProps = FormikProps<{
  ruta: {
    origen: string;
    paradas: {
      municipioId: string;
      kms: number;
      id: string;
    }[];
  };
}>;

export default function RutaDialog() {
  const formularioStore = useFormularioStore();

  const findMunicipalityByRegionCode = useQuery<MunicipalityEntity[]>(
    `findMunicipality`,
    () => retrieveMunicipalities(),
  );

  const data = findMunicipalityByRegionCode.data ?? [];

  const onClose = () => {
    formularioStore.setToggleModalRuta();
  };

  return (
    <Dialog
      open={formularioStore.toggleModalRuta}
      onClose={onClose}
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
          const ruta = {
            origen: {
              municipioId: values.ruta.origen,
              name:
                data.find((municipio) => municipio.id === values.ruta.origen)
                  ?.name ?? '',
            },
            paradas: values.ruta.paradas.map((parada) => {
              const municipio = data.find(
                (municipio) => municipio.id === parada.municipioId,
              );

              return {
                municipioId: parada.municipioId,
                municipioName: municipio?.name ?? '',
                kms: parada.kms,
              };
            }),
          };

          formularioStore.setRuta(ruta);
        }}
        validationSchema={validationsSchema}
      >
        {(formikProps) => {
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
                <Origen formik={formikProps} data={data} />

                <Divider />

                <Box
                  sx={{
                    height: '50px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">Kilometros Totales:</Typography>
                  <Typography variant="h3">
                    {formikProps.values.ruta.paradas.reduce(
                      (prev, current) => current.kms + prev,
                      0,
                    )}
                  </Typography>
                </Box>
              </DialogContent>

              <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
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
