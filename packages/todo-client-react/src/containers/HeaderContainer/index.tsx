import React from 'react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: calc(100% - 32px);
  height: 44px;
  padding: 0 16px;
  color: #ffffff;
  font-weight: 700;
  background: #5267fb;
`;

const HeaderContainer = () => {
  return (
    <HeaderWrapper>
      <div>ToDoit</div>
      <div>
        <NotificationsOutlinedIcon />
      </div>
    </HeaderWrapper>
  );
};

export default HeaderContainer;
