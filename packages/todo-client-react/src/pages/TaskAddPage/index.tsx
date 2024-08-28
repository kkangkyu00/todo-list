import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, InputAdornment } from '@mui/material';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { DynamicForm } from '@components';
import DateModal from '@pages/TaskAddPage/DateModal';
import { TaskAddContainer } from '@pages/TaskAddPage/style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Dayjs } from 'dayjs';

const HeaderWrapper = styled.div`
  height: 50px;
  display: flex;
  font-size: 18px;
  font-weight: 600;
`;

const StyledSubmit = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 16px);
  padding: 8px;
  //background: #212123;

  button {
    width: 100%;
    height: 54px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    background: #5267fb;
    border-radius: 6px;
  }
`;

interface FormValue {
  title?: string;
  description?: string;
  startDate: string;
  endDate: string;
  priority?: 'LOW' | 'MIDDLE' | 'HIGH';
  color?: string;
}

const TaskAddPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<FormValue>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'MIDDLE'
  });

  const onSubmit = (data: FormValue) => {
    console.log(data, '############ onSubmit');
  };

  const handlePickerClick = (name: string) => {
    console.log(name, '########### name');
    setOpen((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSubmit = (value: Dayjs) => {
    console.log(value.format('YYYY-MM-DD HH:mm'), '###########');
  };

  const handleChange = (name: string, value: FormValue) => {
    console.log(name, value, '################');
    setDatas(value);
  };

  const formOptions = [
    {
      field: 'input',
      name: 'title',
      label: '제목',
      rules: { required: '제목을 입력해주세요.' },
      props: {
        inputProps: { placeholder: '제목', maxLength: 25 }
      }
    },
    {
      field: 'input',
      name: 'description',
      label: '자세한 설명',
      props: {
        multiline: true,
        rows: 5,
        inputProps: { maxLength: 100 }
      }
    },
    {
      name: 'startDate',
      field: 'input',
      label: '시작일',
      grid: 2,
      props: {
        onClick: () => handlePickerClick('startDate'),
        InputProps: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          )
        }
      }
    },
    {
      name: 'endDate',
      field: 'input',
      label: '종료일',
      grid: 2,
      props: {
        onClick: () => handlePickerClick('endDate'),
        InputProps: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          )
        }
      }
    },
    {
      name: 'priority',
      field: 'toggleGroup',
      label: '우선순위',
      props: {
        buttons: [
          { value: 'LOW', label: '낮음' },
          { value: 'MIDDLE', label: '중간' },
          { value: 'HIGH', label: '높음' }
        ]
      }
    }
  ];

  return (
    <TaskAddContainer>
      <HeaderWrapper>
        <ArrowBackIosIcon />
        <div>일정 등록하기</div>
      </HeaderWrapper>
      <DynamicForm
        fields={formOptions}
        values={datas}
        onChange={handleChange}
        onSubmit={onSubmit}
        buttonSubmit={
          <StyledSubmit>
            <Button type="submit">확인</Button>
          </StyledSubmit>
        }
      />
      <DateModal open={open} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </TaskAddContainer>
  );
};

export default TaskAddPage;
