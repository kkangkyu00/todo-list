import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { ToggleButtonGroup, ToggleButton, Button, Dialog, DialogActions } from '@mui/material';
import { Input } from '@components';
import Calendar from '@components/Calendar/Calendar';
// import DatePicker from '@components/Calendar/DatePicker';
import TimePicker from '@components/Calendar/TimePicker';

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

const ModalWrapper = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 60px);
  padding: 16px;
  background: #fff;
`;

const StyledModal = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    height: 100%;
    margin: 32px 18px;
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
  const [timeOpen, setTimeOpen] = useState<boolean>(false);
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
      <StyledModal open={open}>
        <ModalWrapper>
          <div>
            <Calendar />
            <div>
              <Button>오늘</Button>
              <Button>내일</Button>
              <Button>다음주</Button>
              <Button>다음달</Button>
            </div>
            <div>시간</div>
            <div>
              <Input
                inputLabel="시작일"
                formFieldProps={{ name: 'startDate', control }}
                onClick={() => setTimeOpen(true)}
              />
              <Input
                inputLabel="종료일"
                formFieldProps={{ name: 'endDate', control }}
                onClick={() => setTimeOpen(true)}
              />
            </div>

            <div>aa</div>
          </div>
          <DialogActions>
            <Button onClick={handleCloseModal}>취소</Button>
            <Button>확인</Button>
          </DialogActions>
        </ModalWrapper>
      </StyledModal>

      <StyledModal open={timeOpen} hideBackdrop>
        <ModalWrapper>
          <div>
            <TimePicker />
            <div>
              <Button>오늘</Button>
              <Button>내일</Button>
              <Button>다음주</Button>
              <Button>다음달</Button>
            </div>
          </div>
          <DialogActions>
            <Button onClick={() => setTimeOpen(false)}>취소</Button>
            <Button onClick={() => setTimeOpen(false)}>확인</Button>
          </DialogActions>
        </ModalWrapper>
      </StyledModal>
    </div>
  );
};

export default TaskAddPage;
