/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reorder, HTMLMotionProps } from 'framer-motion';
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

const StyleReorderGroup = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

const SectionWrapper = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  background: #ededed;

  & > div:first-child {
    //padding-top: 32px;
    padding-top: 54px;
  }
`;

const SectionContent = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: #ffffff;

  //&:first-child {
  //  margin-top: -16px;
  //}

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

const HomePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([1, 2]);

  const handleMoreClick = () => navigate('/');

  const handleRefreshClick = () => {
    //
  };

  return (
    <HomePageWrapper>
      <SectionWrapper>
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
              일정 더보기
            </Button>
            <Button className="task-refresh-btn" onClick={handleRefreshClick}>
              <LoopIcon />
            </Button>
          </div>
        </SectionContent>
      </SectionWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
