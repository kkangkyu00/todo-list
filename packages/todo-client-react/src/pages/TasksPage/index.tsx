/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { HorizontalCalendar } from '@components';
import dayjs, { Dayjs } from 'dayjs';

const StyleCalendar = styled.div``;

const WeekTaskItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 100%;
  border: 1px solid red;
  background: blue;
`;

const TimeItem = styled.div`
  height: 40px;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
`;

const tasks = [
  {
    idx: 1,
    name: '사용자 정보 수정 시 본인인증 비활성',
    description: '아무말이나 일단 적어',
    startDate: dayjs('2024-07-11 09:00:00'),
    endDate: dayjs('2024-07-11 10:00:00')
  },
  {
    idx: 2,
    name: '웹뷰 플로팅 배너 노출',
    description: undefined,
    startDate: dayjs('2024-07-11 12:00:00'),
    endDate: dayjs('2024-07-11 15:00:00')
  },
  {
    idx: 3,
    name: '날짜 겹침 테스트',
    description: undefined,
    startDate: dayjs('2024-07-11 13:40:00'),
    endDate: dayjs('2024-07-11 16:30:00')
  }
];

const TasksPage = () => {
  const navigate = useNavigate();

  const getHourAndMinute = (date: Dayjs | string) => {
    const hour = dayjs(date).hour();
    const minute = dayjs(date).minute();
    return { hour, minute };
  };

  const getHourDuration = (date: Dayjs | string) => {
    const hours = dayjs(date).hour();
    const minutes = dayjs(date).minute();
    return dayjs.duration({ hours, minutes }).asHours();
  };

  return (
    <div>
      <StyleCalendar>
        <HorizontalCalendar />
      </StyleCalendar>
      <div>
        <div>일별로 보기</div>
        <div>주별로 보기</div>
      </div>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <TimeItem />
        {new Array(23).fill(0).map((_, i) => (
          <TimeItem>
            {dayjs()
              .hour(i + 1)
              .format('A hh')}
          </TimeItem>
        ))}
        <div style={{ paddingLeft: 60 }}>
          {tasks.map((task, zIndex) => {
            const startPoint = getHourDuration(task.startDate);
            const endPoint = getHourDuration(task.endDate);

            const top = `${40 * startPoint}px`;
            const height = `${40 * (endPoint - startPoint)}px`;
            return <WeekTaskItem style={{ zIndex, top, height }}>{task.name}</WeekTaskItem>;
          })}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
