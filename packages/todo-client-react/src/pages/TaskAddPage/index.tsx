import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { DynamicForm } from '@components';
import { TaskAddContainer } from '@pages/TaskAddPage/style';
import { useTasks, useSaveTask } from '@hooks/task';

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
}

const formOptions = [
  {
    field: 'input',
    name: 'title',
    label: '제목',
    rules: { required: '제목을 입력해주세요.' },
    props: { inputProps: { placeholder: '제목', maxLength: 25 } }
  },
  {
    field: 'input',
    name: 'description',
    label: '자세한 설명',
    props: { multiline: true, rows: 5, inputProps: { maxLength: 100 } }
  },
  {
    name: 'startDate',
    field: 'datePicker',
    label: '시작일',
    grid: 2
  },
  {
    name: 'endDate',
    field: 'datePicker',
    label: '종료일',
    grid: 2
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

const TaskAddPage = () => {
  const { data } = useTasks();
  const { mutate } = useSaveTask();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<FormValue>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'MIDDLE'
  });

  useEffect(() => {
    console.log(data, '####');
  }, [data]);

  const handleFormSubmit = (submitData: FormValue) => {
    console.log(submitData, '############ onSubmit');
    mutate(submitData);
  };

  return (
    <TaskAddContainer>
      <HeaderWrapper>
        <ArrowBackIosIcon />
        <div>일정 등록하기</div>
      </HeaderWrapper>
      <DynamicForm
        fields={formOptions}
        values={formData}
        onSubmit={handleFormSubmit}
        buttonSubmit={
          <StyledSubmit>
            <Button type="submit">확인</Button>
          </StyledSubmit>
        }
      />
    </TaskAddContainer>
  );
};

export default TaskAddPage;
