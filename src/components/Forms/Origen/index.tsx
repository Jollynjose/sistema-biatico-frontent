import { getAllRegions } from '@/api';
import Select from '@/components/Inputs/Select';
import LoadingBackdrop from '@/components/LoadingBackdrop';
import { RegionEntity } from '@/interfaces/region';
import { Box } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { RutaFormikProps } from '../Rutas';
import { MunicipalityEntity } from '@/interfaces/municipality';

const retrieveRegions = async () => {
  const response = await getAllRegions();
  return response?.results ?? [];
};

function Origen(props: {
  formik: RutaFormikProps;
  data: MunicipalityEntity[];
}) {
  const findAllRegionQuery = useQuery<RegionEntity[]>(
    'findAllRegionQuery',
    retrieveRegions,
  );

  const { formik, data } = props;

  if (findAllRegionQuery.isLoading) {
    return <LoadingBackdrop />;
  }

  const error = formik.errors.ruta?.origen;

  const touched = formik.touched.ruta?.origen;

  const isError = Boolean(error) && Boolean(touched);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Select
        label="Seleccione el origen"
        selectProps={{
          sx: {
            width: '100%',
          },
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          name: 'ruta.origen',
          error: isError,
          MenuProps: {
            sx: {
              maxHeight: '400px',
            },
          },
        }}
        menuItemsProps={data.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
      />
    </Box>
  );
}

export default Origen;
