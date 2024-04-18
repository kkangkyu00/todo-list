import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  height: 44px;
`;

const HeaderContainer = () => {
  return (
    <HeaderWrapper>
      <div>HeaderContainer</div>
    </HeaderWrapper>
  );
};

export default HeaderContainer;
