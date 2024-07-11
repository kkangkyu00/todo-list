import styled from 'styled-components';

export const TabWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  bottom: 0;
  width: 100%;

  & > div {
    display: flex;
    align-items: end;

    width: 100%;
    height: 64px;
    //background: #6254c0;
    background: #5267fb;
  }
  .tab-border {
    position: absolute;
    top: 0px;
    left: 15px;
    width: 60px;
    height: 58px;
    background: #5267fb;
    border-radius: 0 0 100% 100%;

    svg {
      position: absolute;
      top: 8px;
      fill: #5267fb;

      &:first-child {
        right: calc(100% - 1px);
        transform: scaleX(-1);
      }
      &:last-child {
        left: calc(100% - 1px);
      }
    }
  }
`;

export const TabContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: calc(100% - 8px);
  background: #ffffff;

  .tab {
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
  }

  .tab.active span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50% 50%;
    background: #ffffff;
  }
`;
