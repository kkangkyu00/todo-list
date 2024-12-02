import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { TaskAddContainer } from '@pages/TaskAddPage/style';
import { useTasks } from '@hooks/task';

const HeaderWrapper = styled.div`
  height: 50px;
  display: flex;
  font-size: 18px;
  font-weight: 600;
`;

interface FormValue {
  title?: string;
  description?: string;
  startDate: string;
  endDate: string;
  priority?: 'LOW' | 'MIDDLE' | 'HIGH';
}

const TaskAddPage = () => {
  const { data } = useTasks();
  // const { mutate } = useSaveTask();
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

  return (
    <TaskAddContainer>
      <HeaderWrapper>
        <ArrowBackIosIcon />
        <div>일정 등록하기</div>
      </HeaderWrapper>
    </TaskAddContainer>
  );
};

export default TaskAddPage;
