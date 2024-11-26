import Select from '@/components/Inputs/Select';
import { Box, SelectProps } from '@mui/material';
import React from 'react';
import { ProvinceEntity } from '@/interfaces/province';

function Origen(props: {
  data: ProvinceEntity[];
  selectProps: SelectProps;
  label: string;
}) {
  const { data } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Select
        label={props.label}
        selectProps={props.selectProps}
        menuItemsProps={data.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
      />
    </Box>
  );
}

export default Origen;
