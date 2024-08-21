import React from 'react';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps, InputLabel } from '@mui/material';
import styled from 'styled-components';

const TextFieldWrapper = styled.div`
  //width: 100%;
`;

export type MuiFieldProps = TextFieldProps & {
  inputLabel?: string;
};

export type ControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  formFieldProps?: UseControllerProps<TFieldValues, TName>;
};

const Input = ({ formFieldProps, inputLabel, name = '', ...props }: MuiFieldProps & ControllerProps) => {
  const {
    field,
    fieldState: { error }
  } = useController({ ...formFieldProps, name });
  return (
    <TextFieldWrapper>
      {inputLabel ? <InputLabel id={inputLabel}>{inputLabel}</InputLabel> : null}
      <TextField id={inputLabel} {...props} {...field} error={!!error} helperText={!!error && error.message} />
    </TextFieldWrapper>
  );
};

export default Input;
