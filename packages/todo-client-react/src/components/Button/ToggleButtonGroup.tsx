import React from 'react';
import { ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton, ToggleButtonProps } from '@mui/material';
import styled from 'styled-components';

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)`
  &,
  & button {
    width: 100%;
  }
`;

interface IButton extends ToggleButtonProps {
  label?: string;
}

interface ToggleButtonGroupProps {
  buttons?: IButton[];
}

const ToggleButtonGroup = ({ buttons, ...props }: ToggleButtonGroupProps) => {
  return (
    <StyledToggleButtonGroup {...props}>
      {buttons?.map(({ label, ...buttonItem }) => <ToggleButton {...buttonItem}>{label}</ToggleButton>)}
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtonGroup;
