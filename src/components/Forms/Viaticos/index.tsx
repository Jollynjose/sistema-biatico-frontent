import { CombustibleValues, TransporteValues } from '@/interfaces/viaticos';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import React, { useEffect } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import ViaticosSchema, {
  ViaticosPorPersonaSchemaType,
  ViaticosSchemaType,
} from './Viaticos.schema';
import RutaDialog from '../Rutas';
import { RutaState, useFormularioStore } from '@/stores/formulario.store';
import { retrieveUsers } from '@/api/user';
import { useMutation, useQuery } from 'react-query';
import { FindAllUser } from '@/interfaces/users';
import { retrieveFuel } from '@/api/fuel';
import { Fuel } from '@/interfaces/fuel';
import dayjs from 'dayjs';
import Select from '@/components/Inputs/Select';
import ViaticoPorPersonaInputs from './ViaticoPorPersonaInputs';
import RemoveButton from '@/components/Buttons/RemoveButton';
import AddButton from '@/components/Buttons/AddButton';
import { retrieveProvinces } from '@/api/province';
import { ProvinceEntity } from '@/interfaces/province';
import { getFuelCalculated, getFuelGallons } from '@/helpers/calculos';
import { createTravelExpense } from '@/api/travelExpense';
import { TravelExpense } from '@/interfaces/travelExpenses';
import { useDownloadPDF } from '@/hook/useDownloadPDF';
import { getTravelExpensePdf } from '@/api/generatePdf';

const initialValues = {
  people: [],
  tolls: [],
  solicitudeDate: null,
  visitMotivation: '',
  dependency: '',
  transportation: TransporteValues.INSTITUCIONAL,
  fuel: CombustibleValues.GASOLINA,
  startPoint: '',
  visitPlace: '',
  kilometers: 0,
  fuelPrice: 0,
  fuelGallons: 0,
  departureTime: null,
  arrivalTime: null,
  fuelTotalPrice: 0,
};

function ViaticosForm() {
  const formularioStore = useFormularioStore();
  const { downloadPDF } = useDownloadPDF();

  const [userSelector, setUserSelector] = React.useState<string[]>([]);
  const [areTollsActive, setAreTollsActive] = React.useState(false);
  const [travelExpense, setTravelExpense] =
    React.useState<TravelExpense | null>(null);

  const findUsersQuery = useQuery<FindAllUser[]>(
    'findUsersQuery',
    retrieveUsers,
  );
  const findFuelQuery = useQuery<Fuel[]>('findFuelQuery', retrieveFuel);
  const findAllProvinces = useQuery<ProvinceEntity[]>(
    'findAllProvinces',
    retrieveProvinces,
  );

  const refetchGeneratorPDf = () => {
    if (travelExpense) {
      getTravelExpensePdf(travelExpense?.id ?? '').then((data) => {
        downloadPDF(data, 'viaticos');
      });
    }
  };

  const createTravelExpenseMutation = useMutation({
    mutationFn: createTravelExpense,
    onSuccess(data) {
      setTravelExpense(data);
      getTravelExpensePdf(data.id ?? '').then((data) => {
        downloadPDF(data, 'viaticos');
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const userData = findUsersQuery.data ?? [];
  const fuelData = findFuelQuery.data ?? [];
  const provinceData = findAllProvinces.data ?? [];

  const fuelPrice = fuelData.map((fuel) => {
    const mostRecentFuelHistory = fuel.fuel_histories.reduce((acc, curr) => {
      return acc.created_at > curr.created_at ? acc : curr;
    });

    return {
      type: fuel.type,
      price: mostRecentFuelHistory.price ?? 0,
      id: mostRecentFuelHistory.id,
    };
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      fuelPrice:
        fuelPrice.find((fp) => fp.type === CombustibleValues.GASOLINA)?.price ??
        0,
    } as unknown as ViaticosSchemaType,
    validationSchema: ViaticosSchema,
    onSubmit: (values) => {
      if (travelExpense) {
        refetchGeneratorPDf();
        return;
      }

      const totalPersonas = values.people.reduce((acc, curr) => {
        return acc + curr.total;
      }, 0);

      const totalPeaje = values.tolls.reduce((acc, curr) => {
        return acc + curr;
      }, 0);

      const totalCombustible = values.fuelTotalPrice;

      const total = totalPersonas + totalPeaje + totalCombustible;

      const requestBody = {
        dependency: values.dependency,
        fuel_history_id:
          fuelPrice.find((fp) => fp.type === values.fuel)?.id ?? '',
        departure_time: values.departureTime.toISOString(),
        arrival_time: values.arrivalTime.toISOString(),
        solicitude_date: values.solicitudeDate.toISOString(),
        total_price: total,
        route: {
          starting_point_province_id: values.startPoint,
          final_destination_province_id: values.visitPlace,
          total_kms: values.kilometers,
          description: values.comentary,
        },
        toll: values.tolls.map((toll, index) => ({
          price: toll,
          order: index + 1,
        })),
        visit_motivation: values.visitMotivation,
        transport_type: values.transportation,
        user_travel_history: values.people.map((person) => {
          const user = userData.find((u) => u.id === person.personId);

          return {
            user_id: person.personId,
            total_price: person.total,
            is_lunch_applied: person.isLunchActive,
            is_breakfast_applied: person.isBreakfastActive,
            is_dinner_applied: person.isDinnerActive,
            is_accommodation_applied: person.isAccommodationActive,
            passage_price: person.passage,
            job_position_history_id:
              user?.job_position.job_position_history_id ?? '',
          };
        }),
      };

      createTravelExpenseMutation.mutate(requestBody);
    },
  });

  const onClose = async (ruta?: RutaState) => {
    if (ruta) {
      const gallons = getFuelGallons(ruta.kms);
      const fuelPrice = getFuelCalculated(formik.values.fuelPrice, ruta.kms);

      formularioStore.setRuta(ruta);

      await formik.setValues({
        ...formik.values,
        fuelTotalPrice: Number(fuelPrice),
        fuelGallons: gallons,
        startPoint: ruta.origen,
        visitPlace: ruta.destino,
        kilometers: ruta.kms,
        comentary: ruta.comentario,
      });

      await formik.setTouched({
        ...formik.touched,
        fuelTotalPrice: true,
        fuelGallons: true,
        startPoint: true,
        visitPlace: true,
        kilometers: true,
        comentary: true,
      });
    }

    formularioStore.setToggleModalRuta();
  };

  const totalPersonas = formik.values.people.reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);

  const totalPeaje = formik.values.tolls.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const totalCombustible = formik.values.fuelTotalPrice;

  const total = totalPersonas + totalPeaje + totalCombustible;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.525rem',
        width: { xs: '100%', md: '50%' },
        overflow: 'hidden',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      component="form"
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

      <TextField
        label="Motivo de Visita"
        name="visitMotivation"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.visitMotivation}
        error={
          formik.touched.visitMotivation &&
          Boolean(formik.errors.visitMotivation)
        }
        helperText={
          formik.touched.visitMotivation && formik.errors.visitMotivation
        }
      />

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
        {formularioStore.ruta ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.525rem',
              alignItems: 'start',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '.525rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant="body1">
                {
                  provinceData.find(
                    (p) => p.id === formularioStore.ruta?.origen,
                  )?.name
                }{' '}
                -{' '}
                {
                  provinceData.find(
                    (p) => p.id === formularioStore.ruta?.destino,
                  )?.name
                }{' '}
                Distancia de {formularioStore.ruta?.kms} km
              </Typography>

              <Button
                variant="contained"
                onClick={() => formularioStore.setToggleModalRuta()}
              >
                Cambiar Ruta
              </Button>
            </Box>

            <Typography variant="body2">
              Comentario: {formularioStore.ruta.comentario}
            </Typography>
          </Box>
        ) : (
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
              onClick={() => formularioStore.setToggleModalRuta()}
            >
              Seleccionar Ruta
            </Button>
          </Box>
        )}
      </Box>
      <Divider />

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '.525rem',
        }}
      >
        <TextField
          label="Precio Combustible"
          value={
            fuelPrice.find((fp) => fp.type === formik.values.fuel)?.price ?? 0
          }
          disabled
        />

        <TextField
          label="Galones de Combustible"
          disabled
          value={formik.values.fuelGallons}
        />
        <TextField
          label="Cantidad de efectivo"
          disabled
          value={formik.values.fuelTotalPrice}
        />
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
          name="departureTime"
          onChange={(date) => {
            formik.setFieldValue('departureTime', date?.toDate() ?? null);
            formik.setFieldTouched('departureTime', true);
          }}
        />
        <Typography variant="h6">-</Typography>
        <MobileTimePicker
          label="Hora de llegada"
          openTo="hours"
          sx={{
            width: '100%',
          }}
          name="arrivalTime"
          onChange={(date) => {
            formik.setFieldValue('arrivalTime', date?.toDate() ?? null);
            formik.setFieldTouched('arrivalTime', true);
          }}
          minTime={
            formik.values.departureTime === null
              ? undefined
              : dayjs(formik.values.departureTime)
          }
        />
      </Box>

      <FormikProvider value={formik}>
        <Box>
          <Typography variant="h6">Solicitud por personas</Typography>

          <FieldArray name="people">
            {(arrayHelpers) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.525rem',
                  }}
                >
                  <Select
                    menuItemsProps={
                      userData.map((user) => ({
                        label: user.first_name + ' ' + user.last_name,
                        value: user.id,
                      })) ?? []
                    }
                    label={'Seleccione un usuario'}
                    selectProps={{
                      multiple: true,
                      input: (
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      ),
                      renderValue: (selected) => {
                        const values = selected as string[];
                        return (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {values.map((value) => {
                              const user = userData.find((u) => u.id === value);

                              const label =
                                (user?.first_name ?? '') +
                                ' ' +
                                (user?.last_name ?? '');

                              return <Chip key={value} label={label} />;
                            })}
                          </Box>
                        );
                      },
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,
                            width: 250,
                          },
                        },
                      },
                      value: userSelector,
                      onChange: (e) => {
                        const value: string[] = e.target.value as string[];
                        setUserSelector(value);

                        if (value.length > formik.values.people.length) {
                          // TODO: Add new person
                          const userIdToAdd = value.find(
                            (userId) =>
                              !formik.values.people.some(
                                (person) => person.personId === userId,
                              ),
                          );

                          if (userIdToAdd) {
                            const data = userData.find(
                              (user) => user.id === userIdToAdd,
                            );

                            if (data) {
                              const {
                                job_position: {
                                  lunch,
                                  name,
                                  breakfast,
                                  dinner,
                                  accommodation,
                                },
                              } = data;

                              const newPerson: ViaticosPorPersonaSchemaType = {
                                personId: data.id,
                                position: name,
                                employeeName:
                                  data.job_position_specification ?? '',
                                fullName:
                                  data.first_name + ' ' + data.last_name,
                                isBreakfastActive: true,
                                isLunchActive: true,
                                isDinnerActive: true,
                                breakfast,
                                lunch,
                                dinner,
                                accommodation,
                                isAccommodationActive: true,
                                total:
                                  lunch + breakfast + dinner + accommodation,
                                passage: 0,
                              };

                              arrayHelpers.push(newPerson);
                            }
                          }
                        } else {
                          // TODO: Remove person
                          const usersToDelete: ViaticosPorPersonaSchemaType[] =
                            formik.values.people.reduce((acc, curr) => {
                              if (!value.includes(curr.personId)) {
                                acc = [...acc, curr];
                              }

                              return acc;
                            }, [] as ViaticosPorPersonaSchemaType[]);

                          usersToDelete.forEach((person) => {
                            const index = formik.values.people.findIndex(
                              (p) => p.personId === person.personId,
                            );
                            if (index !== -1) {
                              arrayHelpers.remove(index);
                            }
                          });
                        }
                      },
                    }}
                  />
                  {formik.values.people.map((person, index) => {
                    return (
                      <ViaticoPorPersonaInputs
                        key={person.personId}
                        formik={formik}
                        index={index}
                      />
                    );
                  })}
                </Box>
              );
            }}
          </FieldArray>
        </Box>

        <Divider />

        <FieldArray name="tolls">
          {(arrayHelpers) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.525rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '.525rem',
                  }}
                >
                  <Typography variant="h6">Desea agregar peajes?</Typography>
                  <Switch
                    onChange={(e) => {
                      setAreTollsActive(e.target.checked);

                      if (!e.target.checked) {
                        formik.setFieldValue('tolls', []);
                      } else {
                        arrayHelpers.push(0);
                      }
                    }}
                    checked={areTollsActive}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.525rem',
                  }}
                >
                  {formik.values.tolls.map((toll, index) => {
                    return (
                      <Box
                        key={`Peaje-${index}`}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          gap: '.525rem',
                        }}
                      >
                        <TextField
                          label={`Peaje ${index + 1}`}
                          type="number"
                          value={toll}
                          sx={{
                            width: '100%',
                          }}
                          name={`tolls[${index}]`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '1rem',
                          }}
                        >
                          <RemoveButton
                            variant="outlined"
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                            disabled={formik.values.tolls.length === 1}
                          />

                          <AddButton
                            variant="contained"
                            onClick={() => {
                              arrayHelpers.push(0);
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                {areTollsActive && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '.525rem',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: '.525rem',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          width: 'px',
                        }}
                        component="p"
                      >
                        Total de Peajes:{' '}
                      </Typography>

                      <Typography variant="h4" component="p">
                        {formik.values.tolls.reduce((acc, curr) => {
                          return acc + curr;
                        }, 0)}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
                )}
              </Box>
            );
          }}
        </FieldArray>
      </FormikProvider>

      {!areTollsActive && <Divider />}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '.525rem',
        }}
      >
        <Typography variant="h6" component="p">
          Total:{' '}
        </Typography>
        <Typography variant="h4" component="p">
          RD${total}
        </Typography>
      </Box>

      <Button variant="contained" type="submit">
        <Typography variant="body1">
          {travelExpense !== null ? 'Descargar PDF' : 'Guardar'}
        </Typography>
      </Button>

      <RutaDialog onClose={onClose} />
    </Box>
  );
}

export default ViaticosForm;
