import React, { useEffect, useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@mui/material';
import { ArrowBackIosNew as ArrowBackIcon, ArrowForwardIos as ArrowForwardIcon } from '@mui/icons-material';

import styled from 'styled-components';
import { classNames } from '@utils';

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

const WeekItem = styled.div`
  position: relative;
  display: flex;
`;

const DateItem = styled.div`
  width: 100%;
  height: 30px;
  text-align: center;
  border: 1px solid #000;

  &.today {
    color: blue;
  }
  &.select {
    color: red;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calendar = ({ markedDates, isHorizontal }: CalendarProps) => {
  const [calendarDate, setCalendarDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const firstDayOfMonth = dayjs(calendarDate).startOf('month').day();
  const lastDayOfMonth = dayjs(calendarDate).endOf('month').day();

  useEffect(() => {
    setCalendarDate(selectedDate);
  }, [selectedDate]);

  const prevDates = useMemo(() => {
    const dates: Dayjs[] = [];
    for (let idx = firstDayOfMonth; idx > 0; idx -= 1) {
      const date = dayjs(calendarDate).startOf('month');
      dates.push(dayjs(date).add(-idx, 'day'));
    }
    return dates;
  }, [firstDayOfMonth, calendarDate]);

  const nextDates = useMemo(() => {
    const dates: Dayjs[] = [];
    for (let idx = 1; idx <= 6 - lastDayOfMonth; idx += 1) {
      const date = dayjs(calendarDate).endOf('month');
      dates.push(dayjs(date).add(idx, 'day'));
    }
    return dates;
  }, [lastDayOfMonth, calendarDate]);

  const currentDates = useMemo(() => {
    const dates: Dayjs[] = [];
    const startDate = dayjs(calendarDate).startOf('month');
    const endDate = dayjs(calendarDate).endOf('month');
    for (let i = startDate; i.isBefore(endDate); i = i.add(1, 'day')) {
      dates.push(i);
    }
    return dates;
  }, [calendarDate]);

  const calendarDates = useMemo(() => {
    const array = [...prevDates, ...currentDates, ...nextDates];
    const answer = [];
    for (let i = 0; i < array.length / 7; i += 1) {
      answer.push(array.slice(i * 7, i * 7 + 7));
    }
    return answer;
  }, [prevDates, currentDates, nextDates]);

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const handlePrevClick = () => {
    setCalendarDate(calendarDate.add(-1, 'month'));
  };

  const handleNextClick = () => {
    setCalendarDate(calendarDate.add(1, 'month'));
  };

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
          let h = 0;
          return (
            <WeekItem>
              {dates.map((date) => {
                return (
                  <DateItem
                    onClick={() => handleDateClick(date)}
                    className={classNames({
                      select: dayjs(date).isSame(selectedDate, 'day'),
                      today: dayjs(date).isSame(dayjs(), 'day')
                    })}
                  >
                    <span>{date.date()}</span>
                    {markedDates?.map((marker, i) => {
                      const isAfter = dayjs(date).isSameOrAfter(marker.startDate, 'day');
                      const isBefore = dayjs(date).isSameOrBefore(marker.endDate, 'day');
                      const l = (100 / 7) * dayjs(date).day();
                      if (isAfter && isBefore) {
                        h += 1;
                        return <div style={{ position: 'absolute', top: `${h}em`, left: `${l}%` }}>{i}</div>;
                      }
                      return null;
                    })}
                  </DateItem>
                );
              })}
            </WeekItem>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
