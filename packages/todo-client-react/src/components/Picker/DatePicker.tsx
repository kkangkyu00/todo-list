import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { TextField, InputAdornment } from '@mui/material';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

import DatePickerModal from '@pages/TaskAddPage/DateModal';
import { TextFieldWrapper } from '@components/Input';

export interface DatePickerProps {
  name?: string;
  onChange?: (value: Dayjs | string) => void;
}

const DatePicker = ({ name = '', ...formFieldProps }: DatePickerProps) => {
  const { field } = useController({ name, ...formFieldProps });
  const [isOpen, setOpen] = useState<boolean>();

  const handlePickerClick = () => setOpen((prevState) => !prevState);

  const handleModalSubmit = (value: Dayjs | string) => {
    field.onChange(dayjs(value).format('YYYY-MM-DD HH:mm'));
  };

  return (
    <TextFieldWrapper>
      <TextField
        onClick={handlePickerClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          )
        }}
        {...field}
      />
      <DatePickerModal open={isOpen} onClose={handlePickerClick} onSubmit={handleModalSubmit} />
    </TextFieldWrapper>
  );
};

export default DatePicker;
