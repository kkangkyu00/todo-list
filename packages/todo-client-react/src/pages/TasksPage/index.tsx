/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Reorder, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { HorizontalCalendar } from '@components';
import dayjs, { Dayjs } from 'dayjs';
import { TaskCard } from '@components/Card';
import TopSheet from '@pages/TasksPage/TopSheet';

const WeekTaskItem = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 100%;
  //border: 1px solid red;
  //background: blue;
`;

const TimeItem = styled.div`
  height: 84px;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
  font-size: 12px;
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

  const getHourDuration = (date: Dayjs | string) => {
    const hours = dayjs(date).hour();
    const minutes = dayjs(date).minute();
    return dayjs.duration({ hours, minutes }).asHours();
  };

  return (
    <div style={{ backgroundColor: '#0c0f12' }}>
      <TopSheet />
    </div>
  );
};

// <div style={{ position: 'relative', zIndex: 2, background: '#fff' }}>
//   <div>
//     <div>일별로 보기</div>
//     <div>주별로 보기</div>
//   </div>
//   <div style={{ position: 'relative', height: '100%', width: '100%', paddingTop: 40 }}>
//     {new Array(23).fill(0).map((_, i) => (
//       <TimeItem>
//         {dayjs()
//           .hour(i + 1)
//           .format('A hh')}
//       </TimeItem>
//     ))}
//     <Reorder.Group axis="x" values={[]} onReorder={() => {
//     }} style={{ paddingLeft: 60 }}>
//       {tasks.map((t, zIndex) => {
//         const startPoint = getHourDuration(t.startDate);
//         const endPoint = getHourDuration(t.endDate);
//
//         const top = `${84 * startPoint - 44}px`;
//         const height = `${84 * (endPoint - startPoint)}px`;
//         return (
//           <WeekTaskItem style={{ zIndex, top, height }}>
//             <TaskCard name={t.name} desc={t.description} startDate={t.startDate} endDate={t.endDate} />
//           </WeekTaskItem>
//         );
//       })}
//     </Reorder.Group>
//   </div>
// </div>
export default TasksPage;
