'use client';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import Paradas from '../Paradas';
import * as yup from 'yup';
import { FieldArray, Form, Formik, FormikProps } from 'formik';
import AddButton from '@/components/Buttons/AddButton';
import RemoveButton from '@/components/Buttons/RemoveButton';

const validationsSchema = yup.object({
  paradas: yup
    .array()
    .of(
      yup.object({
        region: yup.string().required('La region es requerida').min(1),
        municipio: yup
          .string()
          .required('El municipio es requerido')
          .nullable(),
        kms: yup
          .number()
          .required('Los kilometros son requeridos')
          .min(0)
          .default(0),
        id: yup.string().required(),
      }),
    )
    .min(1),
});

const INITIAL_VALUES = [
  {
    region: '',
    municipio: '',
    kms: 0,
    id: Math.random().toString(),
  },
];

export type RutaFormikProps = FormikProps<{
  paradas: {
    region: string;
    municipio: string;
    kms: number;
    id: string;
  }[];
}>;

interface RutaDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RutaDialog({ open, onClose }: RutaDialogProps) {
  // const [paradas, setParadas] = React.useState<string[]>([]);

  return (
    <Dialog
      open={open}
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
        initialValues={{
          paradas: INITIAL_VALUES,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationsSchema}
      >
        {(formikProps) => (
          <Form>
            <FieldArray name="paradas">
              {(arrayHelper) => (
                <>
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
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        minHeight: '100px',
                        maxHeight: '190px',
                      }}
                    >
                      <Box
                        sx={{
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '.525rem',
                        }}
                      >
                        {formikProps.values.paradas.map((parada, index) => (
                          <Box
                            key={parada.id}
                            sx={{
                              paddingRight: '1rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              pt: '.525rem',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '1rem',
                              }}
                            >
                              <Typography variant="h6">
                                Parada {index + 1}
                              </Typography>

                              <Box
                                sx={{
                                  display: 'flex',
                                  gap: '1rem',
                                }}
                              >
                                <RemoveButton
                                  variant="outlined"
                                  onClick={() => {
                                    arrayHelper.remove(index);
                                  }}
                                  disabled={
                                    formikProps.values.paradas.length === 1
                                  }
                                />

                                <AddButton
                                  variant="contained"
                                  onClick={() => {
                                    arrayHelper.push({
                                      region: '',
                                      municipio: '',
                                      kms: 0,
                                      id: Math.random().toString(),
                                    });
                                  }}
                                />
                              </Box>
                            </Box>
                            <Paradas formik={formikProps} index={index} />
                          </Box>
                        ))}
                      </Box>
                    </Box>

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
                        {formikProps.values.paradas.reduce(
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
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
