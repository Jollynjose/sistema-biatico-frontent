import { getMunicipalityByRegionCode } from '@/api';
import { MunicipalityEntity } from '@/interfaces/municipality';
import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';

interface MenuItems extends Omit<MenuItemProps, 'children'> {
  label: string;
}

interface Props {
  selectProps?: SelectProps;
  textFieldProps?: TextFieldProps;
  formControlProps?: FormControlProps;
  regionId: string;
  formLabel: string;
}

const retrieveMunicipalitiesByRegionId = async (regionId: string) => {
  const response = await getMunicipalityByRegionCode(regionId);
  return response?.results ?? [];
};

function RutaInput({
  selectProps,
  textFieldProps,
  formControlProps,
  regionId,
  formLabel,
}: Props) {
  const findMunicipalityByRegionCode = useQuery<MunicipalityEntity[]>(
    `findMunicipalityByRegionCode-${regionId ?? ''}`,
    () => retrieveMunicipalitiesByRegionId(regionId as string),
    {
      enabled: regionId.length > 0,
    },
  );

  const isDisabled = regionId.length === 0;

  const menuItems: MenuItems[] =
    findMunicipalityByRegionCode.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) ?? [];

  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '.225rem',
      }}
      {...formControlProps}
    >
      <InputLabel id="demo-simple-select-label">{formLabel}</InputLabel>
      <Select {...selectProps} fullWidth disabled={isDisabled}>
        {menuItems.map((item) => {
          const { label, ...props } = item;
          return (
            <MenuItem key={label} {...props}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
      <TextField
        type="number"
        disabled={isDisabled}
        {...textFieldProps}
        placeholder="Inserte kms"
      ></TextField>
    </FormControl>
  );
}

export default RutaInput;
