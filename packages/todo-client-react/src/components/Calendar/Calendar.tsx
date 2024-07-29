import React, { useEffect, useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import { ArrowBackIosNew as ArrowBackIcon, ArrowForwardIos as ArrowForwardIcon } from '@mui/icons-material';

import styled from 'styled-components';
import { classNames, getDatesInMonth } from '@utils';

interface IMarked {
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
  color?: string;
  markClass?: string;
}

interface CalendarProps {
  markedDates?: IMarked[];
  isHorizontal?: boolean;
}

interface Marker {
  color: string;
  startingDay: boolean;
  endingDay: boolean;
}

const CalendarHeader = styled.div`
  padding: 8px 0;
  .calendar-year {
    text-align: center;
  }
`;
const CalendarHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ArrowButton = styled(Button)``;

const CalendarWeek = styled.div`
  position: relative;
  height: 30px;
`;
const CalendarWeekEvent = styled.div`
  position: relative;
  height: 30px;
`;

const WeekItem = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const DateItem = styled.div`
  width: 100%;
  height: 30px;
  text-align: center;
  border: 1px solid #000;
  vertical-align: initial;

  &.today {
    color: blue;
  }
  &.select {
    color: red;
  }
`;

const View = styled.div`
  height: 4px;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderPeriod = (index: number, item: IMarked) => {
  const styles = {
    backgroundColor: item.color
  };
  return <View style={styles} />;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItems = (items?: IMarked[], date?: Dayjs) => {
  let h = 0;
  return items?.map((marker) => {
    h += 1;
    return renderPeriod(h, marker);
  });
};

const renderMultiMarkings = (items?: IMarked[], date?: Dayjs) => {
  return <div>{getItems(items, date)}</div>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calendar = ({ markedDates, isHorizontal }: CalendarProps) => {
  const [calendarDate, setCalendarDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [markerDates, setMarkerDates] = useState({});

  useEffect(() => {
    setCalendarDate(selectedDate);
  }, [selectedDate]);

  const calendarDates = useMemo(() => {
    return getDatesInMonth(calendarDate);
  }, [calendarDate]);

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const handlePrevClick = () => {
    setCalendarDate(calendarDate.add(-1, 'month'));
  };

  const handleNextClick = () => {
    setCalendarDate(calendarDate.add(1, 'month'));
  };

  // test

  useEffect(() => {
    const emptyPeriod = { color: 'transparent' };
    const sortDates = markedDates?.sort((prev, curr) => {
      const { startDate: prevStart, endDate: prevEnd } = prev;
      const { startDate: currStart, endDate: currEnd } = curr;
      return dayjs(currEnd).diff(currStart, 'day') - dayjs(prevEnd).diff(prevStart, 'day');
    });
    console.log(sortDates, '##############');

    const mArray: Record<string, Record<string, Marker[]>> = sortDates?.reduce((prev, curr) => {
      const start = dayjs(curr.startDate);
      const end = dayjs(curr.endDate);
      const totalDays = end.diff(start, 'day') + 1;

      let rowIndex = 0;
      let freeRowFound = false;
      while (!freeRowFound) {
        freeRowFound = true;
        for (let i = 0; i < totalDays; i += 1) {
          const date = start.add(i, 'day');
          const dateStr = date.format('YYYY-MM-DD');

          const period = prev[dateStr]?.periods?.[rowIndex];
          const isWithinInterval = dayjs(date).isBetween(start, end, 'day', '[]');
          if (period && isWithinInterval) {
            console.log(dateStr, '###### dateStr');
            rowIndex += 1;
            freeRowFound = false;
            break;
          }
        }
      }

      for (let i = 0; i < totalDays; i += 1) {
        const dateStr = start.add(i, 'day').format('YYYY-MM-DD');
        let marking = prev[dateStr];

        if (!marking) marking = {};
        if (!marking.periods) marking.periods = [];

        if (marking.periods.length <= rowIndex) {
          marking.periods = marking.periods.concat(
            [...Array(rowIndex + 1 - marking.periods.length)].map(() => ({ ...emptyPeriod }))
          );
        }
        marking.periods[rowIndex] = {
          color: curr.color,
          startingDay: i === 0,
          endingDay: i === totalDays - 1
        };
        prev[dateStr] = marking;
      }
      return prev;
    }, {});
    setMarkerDates(mArray);
  }, []);

  return (
    <div>
      <CalendarHeader>
        <CalendarHeaderWrapper>
          <ArrowButton onClick={handlePrevClick}>
            <ArrowBackIcon />
          </ArrowButton>
          <div className="calendar-month">{calendarDate.month() + 1}월</div>
          <ArrowButton onClick={handleNextClick}>
            <ArrowForwardIcon />
          </ArrowButton>
        </CalendarHeaderWrapper>
        <div className="calendar-year">{calendarDate.year()}</div>
      </CalendarHeader>
      <div>
        {calendarDates.map((dates) => {
          return (
            <CalendarWeek>
              <WeekItem>
                {dates.map((date) => {
                  const k = dayjs(date).format('YYYY-MM-DD');
                  return (
                    <DateItem
                      onClick={() => handleDateClick(date)}
                      className={classNames({
                        select: dayjs(date).isSame(selectedDate, 'day'),
                        today: dayjs(date).isSame(dayjs(), 'day')
                      })}
                    >
                      <span>{date.date()}</span>
                      {markerDates?.[k] ? (
                        <CalendarWeekEvent>{renderMultiMarkings(markerDates?.[k]?.periods)}</CalendarWeekEvent>
                      ) : null}
                    </DateItem>
                  );
                })}
              </WeekItem>
            </CalendarWeek>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
