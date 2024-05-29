import styled from 'styled-components';

export const CalenderWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  background: #fff;

  .date-group {
    display: flex;
    justify-content: space-between;
    padding: 6px;
    .swiper {
      width: 100%;
    }
    .swiper-slide {
      display: flex;
      justify-content: center;
    }
  }

  .date-item {
    width: 12%;
    height: 100%;
    padding: 4px 0px;
    border-radius: 4px;
    text-align: center;
    .day {
      padding-bottom: 2px;
      font-size: 12px;
      font-weight: 600;
    }
    .dayNumber {
      font-size: 16px;
      font-weight: 700;
    }
    &:first-child .day {
      color: red;
    }
    &:last-child .day {
      color: blue;
    }
    &.active {
      background: #c7e6f7;
    }
  }
`;
