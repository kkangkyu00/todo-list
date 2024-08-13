import React from 'react';
import { useController, FieldValues, FieldPath, UseControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps, InputLabel } from '@mui/material';

export type MuiFieldProps = TextFieldProps & {
  inputLabel?: string;
};

export type ControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  formFieldProps: UseControllerProps<TFieldValues, TName>;
};

const Input = ({ formFieldProps, inputLabel, ...props }: MuiFieldProps & ControllerProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(formFieldProps);
  return (
    <div>
      {inputLabel ? <InputLabel id={inputLabel}>{inputLabel}</InputLabel> : null}
      <TextField id={inputLabel} {...props} {...field} error={!!error} helperText={!!error && error.message} />
    </div>
  );
};

export default Input;
