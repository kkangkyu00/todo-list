/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Loop as LoopIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { TaskCard } from '@components/Card';
import DatePicker, { TDateType } from '@components/Picker/DatePicker';
import { FlexBox, FullWidthFlexBox } from '@styles';
import { DarkModeButton } from '@components';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import TuneIcon from '@mui/icons-material/Tune';

import ToggleButtonGroup from '../../components/Button/ToggleButtonGroup';

const HomePageWrapper = styled.div`
  height: 100%;
  padding: 16px;
`;
const TaskWrapper = styled.div<{ $height?: string; $bgColor?: string }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height};
  // padding: 8px;
  border-radius: 8px;
  background: ${({ theme, $bgColor }) => $bgColor || theme.color.bgSeparator};

  &.icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      scale: 1.2;
    }
  }
`;

const Btn = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #161616;

  svg {
    width: 16px;
    height: 16px;
  }
}
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
  margin-top: 48px;

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
      color: ${({ theme }) => theme.color.background};
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

const CircularProgressWithLabel = ({ value }: { value: number }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const ProviderTasks = () => {
  return (
    <TaskWrapper $height="120px" $bgColor="#b5cff8">
      <div style={{ padding: '8px', color: '#000000', fontWeight: 700 }}>
        <div>우선 일정</div>
        {intended.map(({ name }) => {
          return (
            <div
              style={{
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
      <Btn>
        <ArrowOutwardIcon />
      </Btn>
    </TaskWrapper>
  );
};

const ProgressTaskBar = () => (
  <TaskWrapper $height="50px">
    <FlexBox justify="space-between">
      <div>
        <div>일정 진행률</div>
        <div style={{ color: '#666666', fontSize: '11px', fontWeight: 500 }}>10 / 8 완료</div>
      </div>
      <CircularProgressWithLabel value={80} />
    </FlexBox>
  </TaskWrapper>
);

const ProviderTasks2 = () => {
  return (
    <TaskWrapper $height="178px" $bgColor="#b5cff8">
      <div style={{ padding: '8px', color: '#000000', fontWeight: 700 }}>
        <div>진행중인 일정</div>
        <div>
          <div>아무말이나 일단 적어</div>
          <div>일정에 관한 내용, 아무말 히히</div>
        </div>
      </div>
      <Btn>
        <ArrowOutwardIcon />
      </Btn>
    </TaskWrapper>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([1, 2]);

  const handleMoreClick = () => navigate('/');

  return (
    <HomePageWrapper>
      <FlexBox gap="8px">
        <FullWidthFlexBox gap="8px" direction="column">
          <ProviderTasks />
          <ProgressTaskBar />
        </FullWidthFlexBox>
        <ProviderTasks2 />
      </FlexBox>

      <SectionContent>
        <div>오늘의 일정</div>
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
