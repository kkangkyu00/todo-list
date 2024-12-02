import React from 'react';
import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { Grid, SxProps, Theme } from '@mui/material';
import FormComponentByType, { FieldAttributes } from '@components/Form/FormComponentByType';

import { useYupValidationResolver } from '@hooks/useYupValidationResolver';
import FormLabel from './FormLabel';

export type TFormOption = FieldAttributes & {
  label?: string;
  component?: () => React.ReactNode;
  grid?: number;
  required?: boolean;
  sx?: SxProps<Theme>;
};

export interface FormProps<TFormValues> {
  formName?: string;
  formOptions: TFormOption[];
  values: TFormValues;
  validationSchema?: AnyObjectSchema;
  onSubmit?: (values: TFormValues) => void;
  onChange?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = <TFormValues extends FieldValues>({
  formName = 'form',
  formOptions,
  values,
  validationSchema,
  onSubmit,
  onChange
}: FormProps<TFormValues>) => {
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<TFormValues>({
    values,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver
  });

  const handleSubmit = (formValues: TFormValues) => onSubmit?.(formValues);

  return (
    <FormProvider {...methods}>
      <form id={formName} onSubmit={methods.handleSubmit(handleSubmit)} onChange={(event) => onChange?.(event)}>
        <Grid container>
          {formOptions.map(({ label, required, grid, ...props }) => {
            return (
              <Grid item xs={12 / (grid || 1)}>
                <FormLabel label={label} required={required} />
                <FormComponentByType {...props} />
              </Grid>
            );
          })}
        </Grid>
      </form>
    </FormProvider>
  );
};

export default Form;
