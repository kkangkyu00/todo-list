import React from 'react';
import { useForm, FormProvider, FieldValues, Controller } from 'react-hook-form';
import { InputLabel, Grid } from '@mui/material';
import { Input, ToggleButtonGroup } from '@components';
import { ErrorMessage } from '@components/Form/ErrorMessage';
import DatePicker from '@components/Picker/DatePicker';

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
  onSubmit?: (value: TFormValue) => void;
  onChange?: (name: string, value: TFormValue) => void;
  buttonSubmit?: React.ReactNode;
}

const componentMap = (field: string, props: object) => {
  switch (field) {
    case 'input':
      return <Input {...props} />;
    case 'toggleGroup':
      return <ToggleButtonGroup {...props} />;
    case 'datePicker':
      return <DatePicker {...props} />;
    default:
      return null;
  }
};

const DynamicForm = <TFormValue extends FieldValues>({
  fields,
  values,
  onChange,
  onSubmit,
  buttonSubmit
}: DynamicFormProps<TFormValue>) => {
  const formMethods = useForm<TFormValue>({ mode: 'onSubmit', reValidateMode: 'onSubmit', values });
  const { errors } = formMethods.formState;

  const handleChange = ({ target }: FieldValues) => onChange?.(target.name, target.value);

  const submit = (data: TFormValue) => onSubmit?.(data);

  return (
    <FormProvider {...formMethods}>
      <form autoComplete="off" onSubmit={formMethods.handleSubmit(submit)} onChange={handleChange}>
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
        {buttonSubmit}
      </form>
    </FormProvider>
  );
};

export default DynamicForm;
