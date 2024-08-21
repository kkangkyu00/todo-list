import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { Input } from '@components';
import DateModal from '@pages/TaskAddPage/DateModal';

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledSubmitButton = styled(Button)`
  width: 100%;
`;

const ColorButton = styled(ToggleButton)<{ $color?: string }>`
  &.MuiButtonBase-root.MuiToggleButton-root {
    padding: 10px;
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50% !important;
    background: ${({ $color }) => $color};
  }
`;

interface FormValue {
  title?: string;
  description?: string;
  priority?: 'LOW' | 'MIDDLE' | 'HIGH';
  color?: string;
}

const TaskAddPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'LOW',
      color: 'red'
    }
  });

  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  const handlePickerClick = (name: string) => {
    console.log(name, '########### name');
    setOpen((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput inputLabel="제목" formFieldProps={{ name: 'title', control }} />
        <StyledInput inputLabel="설명" formFieldProps={{ name: 'description', control }} />
        <div>
          <Button onClick={() => handlePickerClick('startDate')}>startDate</Button>
          <Button onClick={() => handlePickerClick('endDate')}>endDate</Button>
        </div>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup exclusive value={field.value} onChange={field.onChange}>
              <ToggleButton value="LOW">LOW</ToggleButton>
              <ToggleButton value="MIDDLE">MIDDLE</ToggleButton>
              <ToggleButton value="HIGH">HIGH</ToggleButton>
            </ToggleButtonGroup>
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup exclusive value={field.value} onChange={field.onChange}>
              <ColorButton value="red" $color="red" />
              <ColorButton value="yellow" $color="yellow" />
              <ColorButton value="green" $color="green" />
              <ColorButton value="blue" $color="blue" />
              <ColorButton value="blue2" $color="blue" />
              <ColorButton value="blue3" $color="#aebcc0" />
            </ToggleButtonGroup>
          )}
        />
        <StyledSubmitButton type="submit">submit</StyledSubmitButton>
      </form>
      <DateModal open={open} onClose={handleCloseModal} />
    </div>
  );
};

export default TaskAddPage;
