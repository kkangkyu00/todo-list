import React from 'react';
import { Box } from '@mui/material';

interface FormLabelProps {
  label?: string;
  required?: boolean;
}

const FormLabel = ({ label, required }: FormLabelProps) => {
  if (!label) return null;
  return (
    <Box>
      {required ? '*' : null}
      <span>{label}</span>
    </Box>
  );
};

export default FormLabel;
