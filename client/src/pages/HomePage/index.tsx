import React from 'react';
import { CalendarMonth } from '@mui/icons-material';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { HorizontalCalendar } from '../../components';

const HomePageWrapper = styled.div`
  //background: #4045c9;;
  //background: #ededed;
`;

const CalendarSection = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 44px 16px 0px;
  border-radius: 0px 0px 50% 50%;
  background: #00c5ff;

  .curr-date {
    display: flex;
    justify-content: center;
    gap: 4px;
    padding-left: 4px;
    padding-bottom: 8px;

    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
  }
`;

const ScheduleSection = styled.div`
  padding: 24px 16px;
  height: 100%;
  background: #ededed;
  //border-top-right-radius: 26px;
`;

const Group = styled.div``;

const IntendedGroup = styled.div`
  //display: flex;
  //gap: 16px;
  width: 100%;
  height: 100%;
  //overflow: scroll;
`;

const Card = styled.div`
  //min-width: 140px;
  width: 100%;
  height: 60px;
  background: #fff;
  border-radius: 8px;
`;

const intended: number[] = [1, 2, 3, 4, 5];
const program: number[] = [1, 2, 3, 4, 5];

const HomePage = () => {
  localStorage.setItem('tasks', JSON.stringify([{ id: 1 }]));
  return (
    <HomePageWrapper>
      <CalendarSection>
        <div className="curr-date">
          <span>{dayjs().format('YYYY년 MM월')}</span>
          <CalendarMonth />
        </div>
        <HorizontalCalendar />
      </CalendarSection>
      <ScheduleSection>
        <Group>
          <div>예정된 일정</div>
          <IntendedGroup>
            {intended.map(() => (
              <Card>asd</Card>
            ))}
          </IntendedGroup>
        </Group>
        <Group>
          <div>나의 운동 프로그램</div>
          <div>
            {program.map(() => (
              <div />
            ))}
          </div>
        </Group>
      </ScheduleSection>
    </HomePageWrapper>
  );
};

export default HomePage;
