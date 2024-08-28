import React, { useEffect } from 'react';
import { useForm, FormProvider, FieldValues, Controller } from 'react-hook-form';
import { Button, InputLabel, Grid } from '@mui/material';
import { Error } from '@mui/icons-material';
import { Input, ToggleButtonGroup } from '@components';

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
      <Error />
      {error}
    </ErrorMessageWrapper>
  );
};

interface IField {
  component?: React.ReactNode;
  field: string;
  name: string;
  label?: string;
  grid?: number;
  rules?: object;
  props?: object;
}

interface DynamicFormProps<TFormValue> {
  fields: IField[];
  values?: TFormValue;
  onChange?: (name: string, value: TFormValue) => void;
  onSubmit?: (value: TFormValue) => void;
  buttonSubmit?: React.ReactNode;
}

const componentMap = (field: string, props?: object) => {
  switch (field) {
    case 'input':
      return <Input {...props} />;
    case 'toggleGroup':
      return <ToggleButtonGroup {...props} />;
    default:
      return <Input {...props} />;
  }
};

const DynamicForm = <TFormValue extends FieldValues>({
  fields,
  values,
  onSubmit,
  onChange,
  buttonSubmit
}: DynamicFormProps<TFormValue>) => {
  const formMethods = useForm<TFormValue>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const { errors } = formMethods.formState;

  useEffect(() => {
    // formMethods.setValue({ ...values });
    console.log(values);
  }, [values]);

  const handleSubmit2 = (data: TFormValue) => {
    onSubmit?.(data);
  };

  const handleChange = ({ target }: FieldValues) => {
    onChange?.(target.name, target.value);
  };

  return (
    <FormProvider {...formMethods}>
      <form autoComplete="off" onSubmit={formMethods.handleSubmit(handleSubmit2)} onChange={handleChange}>
        <Grid container spacing={2}>
          {fields.map(({ name, label, rules, ...fieldItem }) => (
            <Controller
              name={name}
              rules={rules}
              render={({ field }) => {
                const error = errors[name]?.message as string | undefined;
                return (
                  <Grid item xs={12 / (fieldItem.grid || 1)}>
                    {label ? <InputLabel id={name}>{label}</InputLabel> : null}
                    {componentMap(fieldItem.field, {
                      ...field,
                      ...fieldItem.props,
                      id: name,
                      error: !!error
                    })}
                    <ErrorMessage error={error} />
                  </Grid>
                );
              }}
            />
          ))}
        </Grid>
        {buttonSubmit || <Button type="submit">완료</Button>}
      </form>
    </FormProvider>
  );
};

export default DynamicForm;
