import { getAllRegions } from '@/api';
import RutaInput from '@/components/Inputs/RutaInput';
import Select from '@/components/Inputs/Select';
import LoadingBackdrop from '@/components/LoadingBackdrop';
import { RegionEntity } from '@/interfaces/region';
import { Box } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { RutaFormikProps } from '../Rutas';
import { FormikErrors, FormikTouched } from 'formik';

const retrieveRegions = async () => {
  const response = await getAllRegions();
  return response?.results ?? [];
};

function Paradas(props: { formik: RutaFormikProps; index: number }) {
  const findAllRegionQuery = useQuery<RegionEntity[]>(
    'findAllRegionQuery',
    retrieveRegions,
  );

  const { formik, index } = props;
  const parada = formik.values.paradas[index];

  if (findAllRegionQuery.isLoading) {
    return <LoadingBackdrop />;
  }

  const error = formik.errors.paradas?.[index] as
    | FormikErrors<{
        region: string;
        municipio: string;
        kms: number;
        id: string;
      }>
    | undefined;

  const touched = formik.touched.paradas?.[index] as
    | FormikTouched<{
        region: string;
        municipio: string;
        kms: number;
        id: string;
      }>
    | undefined;

  const isRegionError = Boolean(error?.region) && Boolean(touched?.region);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Select
        label="Seleccione la Region"
        selectProps={{
          sx: {
            width: '100%',
          },
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          name: `paradas.${index}.region`,
          value: parada.region,
          error: isRegionError,
        }}
        menuItemsProps={
          findAllRegionQuery.data?.map((region) => ({
            label: region.name,
            value: region.code,
          })) ?? []
        }
      />

      <Box>
        <RutaInput
          regionId={parada.region}
          formLabel="Seleccione el municipio"
          selectProps={{
            sx: {
              width: '100%',
            },
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            name: `paradas.${index}.municipio`,
            value: parada.municipio,
          }}
          textFieldProps={{
            sx: {
              width: '100%',
            },
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            name: `paradas.${index}.kms`,
            value: parada.kms,
            error: Boolean(error?.kms) && Boolean(touched?.kms),
            helperText: touched?.kms ? error?.kms : '',
          }}
        />
      </Box>
    </Box>
  );
}

export default Paradas;
