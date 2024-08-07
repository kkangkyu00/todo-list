import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from '@components/Calendar/Calendar';
import dayjs, { Dayjs } from 'dayjs';

const StyleCalendar = styled.div`
  padding: 0 16px;
  background: #fff;
  position: sticky;
  top: 44px;
  z-index: 20;
  overflow: hidden;
  //background: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0 -16px 12px 18px rgb(0 0 0 / 15%);
`;

const StyledSheetWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
`;

export const CardBox = styled(motion.div)`
  position: relative;
  background: transparent;
  overflow: hidden;
  width: 100%;
`;

const HeaderWrapper = styled(motion.div)`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  //backgroundColor: '#020617'
  background: #fff;
`;

const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
`;

const CARD_MIN_HEIGHT = 131;

const markedDates = [
  {
    startDate: dayjs('2024-07-12'),
    endDate: dayjs('2024-07-15'),
    color: 'black',
    markClass: undefined
  },
  {
    startDate: dayjs('2024-07-15'),
    endDate: dayjs('2024-07-16'),
    color: 'blue',
    markClass: undefined
  },
  {
    startDate: dayjs('2024-07-15'),
    endDate: dayjs('2024-07-18'),
    color: 'green',
    markClass: undefined
  },
  {
    startDate: dayjs('2024-07-18 13:40:00'),
    endDate: dayjs('2024-07-18 16:30:00'),
    color: 'red',
    markClass: undefined
  }
];

const TopSheet = () => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleTab = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setOpen((prevState) => !prevState);
  };

  const getWeek = (date: Dayjs) => {
    const currentDate = date.date();
    const firstDay = date.add(1, 'day').day();
    return Math.ceil((currentDate + firstDay) / 7) - 1;
  };

  useEffect(() => {
    const week = getWeek(dayjs('2024-8-6'));
    console.log(week, '############');
  }, [open]);

  return (
    <StyleCalendar>
      <StyledSheetWrapper
        layout
        initial={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          height: CARD_MIN_HEIGHT
        }}
        animate={{
          height: open ? 'auto' : CARD_MIN_HEIGHT
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div>
            <CardBox layout>
              <Calendar isHorizontal={!open} markedDates={markedDates} />
            </CardBox>
          </motion.div>
        </AnimatePresence>
      </StyledSheetWrapper>
      <HeaderWrapper onClick={handleTab}>
        <HandleBar />
      </HeaderWrapper>
    </StyleCalendar>
  );
};

export default TopSheet;

// initial={{
//   position: 'relative',
//     width: '100%',
//     height: '100%',
//     top
// }}
// animate={{
//   top: open ? '0px' : top
// }}
