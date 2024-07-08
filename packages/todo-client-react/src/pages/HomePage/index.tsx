/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import { PushPin as PushPinIcon, Loop as LoopIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { TaskCard } from '@components/Card';
import WeatherContainer from '@containers/WeatherContainer';

const HomePageWrapper = styled.div`
  height: 100%;
  padding-bottom: 62px;
`;

const Group = styled.div`
  position: relative;
  padding: 60px 16px 24px;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  background: #5267fb;
  border-radius: 0 0 16px 16px;
`;

const SectionWrapper = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  background: #ededed;

  & > div:first-child {
    padding-top: 32px;
  }
`;

const SectionContent = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #ffffff;

  &:first-child {
    margin-top: -16px;
  }

  .btn-more {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 6px;
    font-size: 14px;

    svg {
      font-size: 16px;
    }
  }
`;

const TodoCard = styled.div`
  position: relative;
  padding: 8px 8px 8px 12px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.12);

  .task-meta {
    padding-bottom: 8px;
    border-bottom: 1px solid #ecedf0;
    & > div {
      display: flex;
      justify-content: space-between;
      svg {
        color: #3c3d48;
        font-size: 18px;
      }
    }

    .task-title {
      padding-bottom: 4px;
      color: #3c3d48;
      font-size: 20px;
      font-weight: 700;
    }
    .task-desc {
      color: #3c3d48;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .task-date {
    padding-top: 8px;
    color: #a0a0b6;
    font-size: 14px;
    font-weight: 700;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 4px;
    height: 100%;
    background: #5267fb;
  }
`;

const intended2 = [
  {
    name: '히히',
    desc: '아무거나 적어',
    startDate: dayjs(),
    endDate: dayjs()
  }
];

interface TaskCardProps {
  name?: string;
  description?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
}

const intended = [
  {
    name: '사용자 정보 수정 시 본인인증 비활성',
    description: '아무말이나 일단 적어',
    startDate: dayjs(),
    endDate: undefined
  },
  {
    name: '웹뷰 플로팅 배너 노출',
    description: undefined,
    startDate: dayjs(),
    endDate: dayjs()
  }
];

const HomePage = () => {
  const [tabValue, setTabValue] = useState('1');
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <HomePageWrapper>
      <Group>ㅁㄴㅇ</Group>
      <SectionWrapper>
        <SectionContent>
          <div>오늘 일정</div>
          {intended?.map((t) => (
            <TaskCard name={t.name} desc={t.description} startDate={t.startDate} endDate={t.endDate} />
          ))}
        </SectionContent>
      </SectionWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
