import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { motion } from 'framer-motion';
import { KeyboardArrowLeft as ArrowBackIcon, KeyboardArrowRight as ArrowForwardIcon } from '@mui/icons-material';
import { classNames, getWeekOfMonth, getDatesInMonth } from '@utils';

import { CalendarHeader, ArrowButton, CalendarWeek, DateItem, DaysItem, MarkedGroup } from './style';

interface FromDateMarked {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
}

interface IMarked {
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
  color?: string;
  markClass?: string;
}

interface CalendarProps {
  markedDates?: IMarked[];
  isHorizontal?: boolean;
  onChange?: (date: Dayjs | string) => void;
}

const DATE_HEIGHT = 40;
const EMPTY_MARKED = { color: 'transparent' };

const generateDayOfWeek = (): React.ReactElement[] => {
  return ['일', '월', '화', '수', '목', '금', '토'].map((value: string) => <DaysItem key={value}>{value}</DaysItem>);
};

const renderPeriod = (index: number, item: IMarked): React.ReactElement => {
  const styles = {
    width: '100%',
    height: '3px',
    backgroundColor: item.color,
    zIndex: 30
  };
  return <div key={index} style={{ position: 'relative', ...styles }} />;
};

const renderMultiMarkings = (items?: IMarked[]) => {
  return items?.map((marked, index) => renderPeriod(index + 1, marked));
};

const Calendar = ({ markedDates, isHorizontal, onChange }: CalendarProps) => {
  const [calendarDate, setCalendarDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    if (!isHorizontal) {
      setCalendarDate(selectedDate);
    }
  }, [selectedDate, isHorizontal]);

  const handlePrevClick = () => {
    if (isHorizontal) {
      setSelectedDate(selectedDate.add(-1, 'week'));
    } else {
      setCalendarDate(calendarDate.add(-1, 'month'));
    }
  };
  const handleNextClick = () => {
    if (isHorizontal) {
      setSelectedDate(selectedDate.add(1, 'week'));
    } else {
      setCalendarDate(calendarDate.add(1, 'month'));
    }
  };

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  const getEmptyMarkedIndex = (prev: Record<string, FromDateMarked[]>, startDate: Dayjs, endDate: Dayjs) => {
    const totalDays = endDate.diff(startDate, 'day') + 1;

    let emptyIndex = 0;
    let freeRowFound = false;
    while (!freeRowFound) {
      freeRowFound = true;
      for (let i = 0; i < totalDays; i += 1) {
        const date = startDate.add(i, 'day');
        const dateKey = date.format('YYYY-MM-DD');

        const marked = prev[dateKey]?.[emptyIndex];
        const isWithinInterval = dayjs(date).isBetween(startDate, endDate, 'day', '[]');
        if (marked && isWithinInterval) {
          emptyIndex += 1;
          freeRowFound = false;
          break;
        }
      }
    }
    return emptyIndex;
  };

  const sortFormDates = useCallback(() => {
    return markedDates
      ?.sort((prev, curr) => {
        const { startDate: prevStart, endDate: prevEnd } = prev;
        const { startDate: currStart, endDate: currEnd } = curr;
        return dayjs(currEnd).diff(currStart, 'day') - dayjs(prevEnd).diff(prevStart, 'day');
      })
      .map((date) => ({
        ...date,
        startDate: dayjs(date.startDate) as Dayjs,
        endDate: dayjs(date.endDate) as Dayjs
      }));
  }, [markedDates]);

  const markerDates = useMemo(() => {
    const sortDates = sortFormDates();
    const init = {} as Record<string, FromDateMarked[]>;
    return sortDates?.reduce((prev, curr) => {
      const temp = prev;
      const { startDate, endDate, color } = curr;

      const totalDays = endDate.diff(startDate, 'day') + 1;
      const emptyIndex = getEmptyMarkedIndex(prev, startDate, endDate);

      for (let i = 0; i < totalDays; i += 1) {
        const dateKey = startDate.add(i, 'day').format('YYYY-MM-DD');
        const marked = temp[dateKey] || [];
        if (marked.length <= emptyIndex) {
          marked.push({ ...EMPTY_MARKED });
        }
        marked[emptyIndex] = { color, startingDay: !i, endingDay: i === totalDays - 1 };
        temp[dateKey] = marked;
      }
      return temp;
    }, init);
  }, [sortFormDates]);

  const calendarDates = useMemo(() => {
    return getDatesInMonth(calendarDate);
  }, [calendarDate]);

  return (
    // <div style={{ overflowX: 'hidden', backgroundColor: '#020617', color: '#F8FAFC' }}>
    <div style={{ overflowX: 'hidden', backgroundColor: '#fff', color: '#0F172A' }}>
      <CalendarHeader>
        <ArrowButton onClick={handlePrevClick}>
          <ArrowBackIcon />
        </ArrowButton>
        <div className="calendar-month">
          {calendarDate.year()} {calendarDate.month() + 1}월
        </div>
        <ArrowButton onClick={handleNextClick}>
          <ArrowForwardIcon />
        </ArrowButton>
      </CalendarHeader>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'inherit',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {generateDayOfWeek()}
      </div>
      <motion.div
        layout
        animate={{
          position: 'relative',
          overflow: 'hidden',
          top: isHorizontal ? `-${DATE_HEIGHT * (getWeekOfMonth(selectedDate) - 1)}px` : 0,
          height: isHorizontal ? `${DATE_HEIGHT * (getWeekOfMonth(selectedDate) + 1)}px` : 'auto'
        }}
      >
        {calendarDates.map((dates) => (
          <CalendarWeek>
            {dates.map((date) => {
              const dateKey = date.format('YYYY-MM-DD');
              const today = date.isToday();
              const select = date.isSame(selectedDate, 'day');
              const month = date.isSame(calendarDate, 'month');
              return (
                <DateItem
                  className={classNames({ today, select, month: !month })}
                  onClick={() => handleDateClick(date)}
                >
                  <span>{date.date()}</span>
                  {markerDates?.[dateKey] ? (
                    <MarkedGroup>{renderMultiMarkings(markerDates[dateKey])}</MarkedGroup>
                  ) : null}
                </DateItem>
              );
            })}
          </CalendarWeek>
        ))}
      </motion.div>
    </div>
  );
};

export default Calendar;
