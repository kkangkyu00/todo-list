import React from 'react';
import { Error as ErrorIcon } from '@mui/icons-material';
import styled from 'styled-components';

const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;

  margin: 6px 0;
  padding: 0 2px;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: red;

  svg {
    width: 18px;
    height: 18px;
    padding-right: 2px;
  }
`;

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return (
    <ErrorMessageWrapper>
      <ErrorIcon />
      {error}
    </ErrorMessageWrapper>
  );
};
