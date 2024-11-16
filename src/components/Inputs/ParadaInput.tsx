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

interface MenuItems extends Omit<MenuItemProps, 'children'> {
  label: string;
}

interface Props {
  selectProps?: SelectProps;
  textFieldProps?: TextFieldProps;
  formControlProps?: FormControlProps;
  formLabel: string;
  menuItems: MenuItems[];
}

function RutaInput({
  selectProps,
  textFieldProps,
  formControlProps,
  formLabel,
  menuItems,
}: Props) {
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
      <Select {...selectProps} fullWidth>
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
        {...textFieldProps}
        placeholder="Inserte kms"
      ></TextField>
    </FormControl>
  );
}

export default RutaInput;
