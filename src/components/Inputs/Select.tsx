import {
  FormControl,
  InputLabel,
  SelectProps,
  Select as SelectMUI,
  MenuItemProps,
  MenuItem,
} from '@mui/material';
import React from 'react';

interface MenuItems extends Omit<MenuItemProps, 'children'> {
  label: string;
}

interface Props {
  label: string;
  selectProps: SelectProps;
  menuItemsProps: MenuItems[];
}

function Select({ label, selectProps, menuItemsProps }: Props) {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <SelectMUI {...selectProps}>
        {menuItemsProps.map((item) => {
          const { label, ...props } = item;

          return (
            <MenuItem key={label} {...props}>
              {label}
            </MenuItem>
          );
        })}
      </SelectMUI>
    </FormControl>
  );
}

export default Select;
