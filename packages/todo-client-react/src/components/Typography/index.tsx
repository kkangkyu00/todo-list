import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export const Typography = ({ children, ...props }: MuiTypographyProps) => (
  <MuiTypography {...props}>{children}</MuiTypography>
);
