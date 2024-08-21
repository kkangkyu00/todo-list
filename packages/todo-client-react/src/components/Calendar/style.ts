import styled from 'styled-components';
import { Button } from '@mui/material';

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

//
export const MarkedGroup = styled.div`
  position: absolute;
  z-index: 8;
  top: 27px;
  left: 0;
  width: 100%;
`;

export const CalendarHeader = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  background: inherit;
  .calendar-year {
    text-align: center;
  }
`;

export const CalendarHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ArrowButton = styled(Button)`
  &.MuiButton-root,
  &.MuiButton-root:hover,
  &.MuiButton-root:active {
    min-width: 24px;
    padding: 0;
    margin: 0 16px;
    color: #000;
    background: #bbbec8;
  }
`;

export const CalendarWeek = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  padding-top: 2px;
`;

export const DateItem = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  text-align: center;
  vertical-align: initial;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;

  &.month span {
    //color: #94a3b8;
    color: #64748b;
    font-weight: 400;
  }
  &.today span {
    //color: #fff;
    //background: #424550;
    color: #0f172a;
    background: #bbbdc7;
    width: 24px;
    height: 24px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    margin: 0 auto;
  }

  &.select span {
    //color: red;
    width: 24px;
    height: 24px;
    margin: auto;
    //background: #fb7185;
    //color: #020617;
    background: #9f1239;
    color: #fff;
    border-radius: 6px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const DaysItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 12px;
  font-weight: 800;
  //color: #fff;
  color: #0f172a;
`;
