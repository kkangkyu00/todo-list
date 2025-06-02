import React from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Box, IconButton } from '@mui/material';
import { NotificationsOutlined as NotificationsIcon } from '@mui/icons-material';

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: calc(100% - 32px);
  height: 44px;
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
      <Box>
        {!isMatchHome ? (
          <IconButton>
            <Box />
          </IconButton>
        ) : null}
      </Box>
      <Box>ToDoit.</Box>
      <Box>
        <NotificationsIcon />
      </Box>
    </HeaderWrapper>
  );
};

export default HeaderContainer;
