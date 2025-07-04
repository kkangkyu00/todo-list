import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useMatch } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { NotificationsOutlined as NotificationsIcon } from '@mui/icons-material';

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: calc(100% - 32px);
  height: 56px;
  padding: 0 16px;
  ${({ theme }) => theme.typography.font20B};
  color: ${({ theme }) => theme.color.main};
  background: ${({ theme }) => theme.color.background};
`;

const HeaderContainer = () => {
  const isMatchHome = useMatch('/main');
  // console.log(isMatchHome, '###############');
  return (
    <HeaderWrapper>
      <div>
        {!isMatchHome ? <IconButton /> : null}
        {isMatchHome ? <div>{dayjs().format('MM월 DD일')}</div> : null}
      </div>
      <div>
        <NotificationsIcon />
      </div>
    </HeaderWrapper>
  );
};

export default HeaderContainer;
