import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';

function RemoveButton(props: ButtonProps) {
  return (
    <Button {...props}>
      <RemoveIcon />
    </Button>
  );
}

export default RemoveButton;
