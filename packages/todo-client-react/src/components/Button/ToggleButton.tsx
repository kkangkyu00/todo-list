import React from 'react';
import { ToggleButton as MuiToggleButton, ToggleButtonProps as MuiToggleButtonProps } from '@mui/material';

const ToggleButton = ({ children, ...toggleButtonProps }: MuiToggleButtonProps) => {
  return <MuiToggleButton {...toggleButtonProps}>{children}</MuiToggleButton>;
};

export default ToggleButton;
