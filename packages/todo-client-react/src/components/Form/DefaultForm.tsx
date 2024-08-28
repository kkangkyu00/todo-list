import React from 'react';
import { FormProvider, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form';

interface FormProps {
  children: React.ReactNode;
  formMethods: UseFormReturn<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
}

const Form = ({ children, formMethods, onSubmit }: FormProps) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

export default Form;
