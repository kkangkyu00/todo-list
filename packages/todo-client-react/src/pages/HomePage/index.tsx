/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Tabs, Tab } from '@mui/material';
import styled from 'styled-components';
import WeatherContainer from '@containers/WeatherContainer';

const HomePageWrapper = styled.div`
  height: 100%;
  padding-bottom: 62px;
  //padding: 44px 0 16px;
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
`;

const TodoCard = styled.div`
  position: relative;
  padding: 8px 8px 8px 12px;
  overflow: hidden;
  border: solid 1px #dfdfdf;
  //border-left: solid 6px #89ccc5;
  border-radius: 4px;
  .task-meta {
    padding-bottom: 8px;
    border-bottom: 1px solid #ecedf0;

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

const intended = [
  {
    name: '히히',
    desc: '아무거나 적어',
    startDate: dayjs().format('.MM .DD'),
    endDate: dayjs().format('.MM .DD')
  },
  {
    name: '하하',
    desc: '일정 간단요약',
    startDate: dayjs().format('.MM .DD'),
    endDate: null
  },
  {
    name: '호호',
    desc: '일정 간단요약',
    startDate: dayjs().format('.MM .DD'),
    endDate: null
  }
];

const HomePage = () => {
  const [tabValue, setTabValue] = useState('1');
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <HomePageWrapper>
      <Group>ToDoit</Group>
      <SectionWrapper>
        <SectionContent>
          <div>예정된 일정</div>
          {intended.map((task) => (
            <TodoCard>
              <div className="task-meta">
                <div className="task-title">{task.name}</div>
                <div className="task-desc">{task.desc}</div>
              </div>
              <div className="task-date">
                {task.endDate
                  ? `${dayjs(task.startDate).format('MM DD')} ~ ${dayjs(task.endDate).format('MM DD')}`
                  : `${dayjs(task.startDate).format('MM DD ⋅ a hh:mm')}`}
              </div>
            </TodoCard>
          ))}
        </SectionContent>
        <SectionContent>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="일정" value="1" />
            <Tab label="일기" value="2" />
          </Tabs>
          {tabValue === '1' ? (
            <div>
              <div>1</div>
            </div>
          ) : (
            <div>
              <div>2</div>
            </div>
          )}
        </SectionContent>
      </SectionWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
