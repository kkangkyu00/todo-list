import React from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';

import { Box, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Typography, EnumFieldType } from '@components';

const StyledTextField = styled(MuiTextField)`
  & .MuiOutlinedInput-root {
    ${({ theme }) => theme.typography.font14R};
  }
  & .MuiOutlinedInput-root.Mui-focused fieldset {
    border: solid 1px #000000;
  }
  & .MuiOutlinedInput-root.Mui-error fieldset {
    border: solid 1px #000000;
  }
`;

export const TextField = (props: MuiTextFieldProps) => {
  return <StyledTextField fullWidth size="small" {...props} />;
};

export interface FormTextFieldProps {
  field: EnumFieldType.TextField;
  fieldProps?: MuiTextFieldProps;
  name: string;
}

export const FormTextField = ({ name, fieldProps }: FormTextFieldProps) => {
  const { field, formState } = useController({ name });
  const message = formState.errors?.[name]?.message as string;
  return (
    <Box>
      <TextField {...field} {...fieldProps} error={!!message} />
      {message ? <Typography>{message}</Typography> : null}
    </Box>
  );
};
