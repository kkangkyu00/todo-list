import { useCallback } from 'react';
import { Resolver } from 'react-hook-form';
import { InferType, ValidationError, AnyObjectSchema } from 'yup';

export const useYupValidationResolver = (validationSchema?: AnyObjectSchema): Resolver<InferType<AnyObjectSchema>> =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema?.validate(data, { abortEarly: false });
        return { values, errors: {} };
      } catch (errors) {
        if (errors instanceof ValidationError) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path!]: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message
                }
              }),
              {}
            )
          };
        }
        throw errors;
      }
    },
    [validationSchema]
  );
