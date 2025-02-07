/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button } from '@mui/material';
import { Loop as LoopIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { TaskCard } from '@components/Card';
import DatePicker, { TDateType } from '@components/Picker/DatePicker';
import ToggleButtonGroup from '../../components/Button/ToggleButtonGroup';

const HomePageWrapper = styled.div`
  height: 100%;
  //padding: 16px;
`;

const StyleReorderGroup = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

const SectionContent = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #ffffff;

  .btn-more {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .task-more-btn {
      display: block;
      padding: 0 4px;
      font-size: 12px;
    }
    .task-refresh-btn {
      min-width: 22px;
      padding: 4px;
      svg {
        font-size: 14px;
      }
    }
    button {
      color: #3c3d48;
    }
  }
`;

const intended = [
  {
    idx: 1,
    name: '사용자 정보 수정 시 본인인증 비활성',
    description: '아무말이나 일단 적어',
    startDate: dayjs(),
    endDate: undefined
  },
  {
    idx: 2,
    name: '웹뷰 플로팅 배너 노출',
    description: undefined,
    startDate: dayjs(),
    endDate: dayjs()
  }
];

const TOGGLE_BUTTONS = [
  { label: '월별', value: 'month' },
  { label: '주별', value: 'week' }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([1, 2]);
  const [dateType, setDateType] = useState<TDateType>('month');

  const handleMoreClick = () => navigate('/');

  const markedDates = [
    {
      startDate: dayjs('2024-12-12'),
      endDate: dayjs('2024-12-15'),
      color: 'black',
      markClass: undefined
    },
    {
      startDate: dayjs('2024-12-15'),
      endDate: dayjs('2024-12-16'),
      color: 'blue',
      markClass: undefined
    },
    {
      startDate: dayjs('2024-12-15'),
      endDate: dayjs('2024-12-18'),
      color: 'green',
      markClass: undefined
    },
    {
      startDate: dayjs('2024-12-18 13:40:00'),
      endDate: dayjs('2024-12-18 16:30:00'),
      color: 'red',
      markClass: undefined
    }
  ];

  const handleToggleChange = (_: React.MouseEvent<HTMLElement>, value: TDateType) => {
    console.log('##### toggle:', value);
    setDateType(value);
  };
  const handleDateChange = (date: Dayjs) => {
    console.log('##### date:', date.format('YYYY-MM-DD'));
  };

  return (
    <HomePageWrapper>
      <ToggleButtonGroup exclusive buttons={TOGGLE_BUTTONS} value={dateType} onChange={handleToggleChange} />
      <DatePicker dateType={dateType} markedDates={markedDates} onChange={handleDateChange} />

      <SectionContent>
        <div>진행중</div>
      </SectionContent>

      <SectionContent>
        <div>예정된 일정</div>
        <StyleReorderGroup>
          <Reorder.Group axis="x" values={items} onReorder={setItems}>
            {intended?.map((t) => (
              <TaskCard idx={t.idx} name={t.name} desc={t.description} startDate={t.startDate} endDate={t.endDate} />
            ))}
          </Reorder.Group>
        </StyleReorderGroup>
        <div className="btn-more">
          <Button className="task-more-btn" onClick={handleMoreClick}>
            더보기
          </Button>
        </div>
      </SectionContent>
    </HomePageWrapper>
  );
};

export default HomePage;
