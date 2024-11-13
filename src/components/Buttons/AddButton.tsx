import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';

function AddButton(props: ButtonProps) {
  return (
    <Button {...props}>
      <AddIcon />
    </Button>
  );
}

export default AddButton;
