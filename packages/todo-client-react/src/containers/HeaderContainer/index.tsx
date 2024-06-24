import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;

  width: 100%;
  height: 44px;
  padding: 0 16px;
  //background: #ffffff;
`;

const HeaderContainer = () => {
  return (
    <HeaderWrapper>
      <div>HeaderContainer</div>
    </HeaderWrapper>
  );
};

export default HeaderContainer;
