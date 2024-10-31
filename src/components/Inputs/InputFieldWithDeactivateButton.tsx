import {
  Box,
  Switch,
  SwitchProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React from 'react';

interface Props {
  switchProps?: SwitchProps;
  textFieldProps?: Omit<TextFieldProps, 'sx'>;
}

function InputFieldWithDeactivateButton({
  switchProps,
  textFieldProps,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Switch {...switchProps} />
      <TextField
        {...textFieldProps}
        sx={{
          width: '100%',
        }}
      />
    </Box>
  );
}

export default InputFieldWithDeactivateButton;
