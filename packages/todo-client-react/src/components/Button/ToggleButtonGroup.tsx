import React from 'react';
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
  ToggleButtonProps as MuiToggleButtonProps
} from '@mui/material';
import styled from 'styled-components';

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)`
  &,
  & button {
    width: 100%;
  }
  &.MuiToggleButtonGroup-root {
    width: 100%;
    padding: 8px 0;
  }
`;

interface IToggleButton extends MuiToggleButtonProps {
  label?: string;
}

interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  buttons?: IToggleButton[];
}

const ToggleButtonGroup = ({ children, buttons, ...props }: ToggleButtonGroupProps) => {
  return (
    <StyledToggleButtonGroup {...props}>
      {buttons?.map(({ label, ...buttonProps }) => <MuiToggleButton {...buttonProps}>{label}</MuiToggleButton>)}
      {children}
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtonGroup;
