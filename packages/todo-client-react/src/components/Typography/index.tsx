import React from 'react';
import styled from 'styled-components';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

const StyledTypography = styled(MuiTypography)`
  &.MuiTypography-root {
    ${({ theme }) => theme.typography.font14R};
    color: ${({ theme }) => theme.color.main};
  }
`;

export const Typography = ({ children, ...props }: MuiTypographyProps) => (
  <StyledTypography {...props}>{children}</StyledTypography>
);
