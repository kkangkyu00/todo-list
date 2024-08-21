import styled from 'styled-components';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const ModalWrapper = styled.div`
  padding: 16px;
  background: #fff;
`;

export const StyledButtonGroup = styled(ToggleButtonGroup)`
  &.MuiToggleButtonGroup-root {
    display: inline-block;
    width: 100%;
    padding: 8px 0;
  }
`;

export const ButtonItem = styled(ToggleButton)`
  &.MuiButtonBase-root.MuiToggleButtonGroup-firstButton,
  &.MuiButtonBase-root.MuiToggleButtonGroup-middleButton,
  &.MuiButtonBase-root.MuiToggleButtonGroup-lastButton {
    height: 28px;
    margin: 4px;
    padding: 0 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    color: #000000;
    background: #bbbec8;
  }
`;

export const TimePickerWrapper = styled.div`
  height: 50vh;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 42px;
  margin-top: 16px;
  padding-bottom: 4px;
  border-bottom: solid 1px #bbbec8;

  label {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .time {
    padding-right: 10px;
    font-size: 14px;
  }
`;
