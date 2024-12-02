import React from 'react';
import { FormTextField, FormTextFieldProps } from '@components/TextField';

export enum EnumFieldType {
  TextField = 'TextField',
  Typography = 'Typography'
}

export type FieldAttributes = FormTextFieldProps;

const FormComponentByType = (fieldProps: FieldAttributes) => {
  const test = () => {
    switch (fieldProps.field) {
      case EnumFieldType.TextField:
        return <FormTextField {...fieldProps} />;
      // case EnumFieldType.Typography:
      //   return <FormTextField {...fieldProps} />;
      default:
        return null;
    }
  };
  return test();
};

export default FormComponentByType;
