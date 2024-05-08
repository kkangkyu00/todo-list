import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { Home, FitnessCenter, AddCard, Leaderboard, Settings } from '@mui/icons-material';
import { classNames } from '@utils';

import { TabWrapper, StyledButtonGroup } from './style';

const pathMap = [
  { icon: <Home />, name: '홈', path: '/' },
  { icon: <FitnessCenter />, name: '프로그램', path: '/program' },
  { icon: <AddCard />, name: '관리', path: '/tasks' },
  { icon: <Leaderboard />, name: '통계', path: '/stat' },
  { icon: <Settings />, name: '설정', path: '/setting' }
];

interface TabContainerProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TabContainer = (props: TabContainerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickTab = (path: string) => {
    navigate(path);
  };
  return (
    <TabWrapper>
      <StyledButtonGroup variant="contained">
        {pathMap.map(({ icon, name, path }) => (
          <Button
            key={path}
            disableRipple
            className={classNames('tab', { active: location.pathname === path })}
            onClick={() => handleClickTab(path)}
          >
            {icon}
            <div className="tab-name">{name}</div>
          </Button>
        ))}
      </StyledButtonGroup>
    </TabWrapper>
  );
};

export default TabContainer;
