import styled from 'styled-components';
import { ButtonGroup } from '@mui/material';

export const TabWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 56px;
  }
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  && {
    button {
      display: flex;
      flex-direction: column;

      width: 100%;
      height: 100%;
      padding-top: 10px;

      border: none;
      background: #fff;
      color: #74757c;
    }
    button:first-child,
    button:last-child {
      border-radius: 0px;
    }
    button.active {
      color: #0f8d1c;
    }
    .tab-name {
      padding-top: 2px;
      font-size: 10px;
    }
  }
`;
