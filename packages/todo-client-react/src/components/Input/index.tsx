import React from 'react';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps, InputLabel } from '@mui/material';
import styled from 'styled-components';

const TextFieldWrapper = styled.div`
  & .MuiOutlinedInput-root {
    border-radius: 6px;
    input {
      padding: 12px;
    }
    input:invalid + fieldset {
      border-color: red;
      border-width: 1px;
    }
    &:not(.Mui-error) {
      fieldset,
      &:hover fieldset,
      &.Mui-focused fieldset {
        //border: solid 1px rgba(0, 0, 0, 0.23);
        border: solid 1.2px #535459;
      }
    }
  }
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
  const { field } = useController({ name, ...formFieldProps });
  return (
    <TextFieldWrapper>
      {inputLabel ? <InputLabel id={inputLabel}>{inputLabel}</InputLabel> : null}
      <TextField fullWidth id={inputLabel} {...props} {...field} />
    </TextFieldWrapper>
  );
};

export default Input;
