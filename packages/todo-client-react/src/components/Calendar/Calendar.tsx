import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { KeyboardArrowLeft as ArrowBackIcon, KeyboardArrowRight as ArrowForwardIcon } from '@mui/icons-material';
import { classNames, getDatesInMonth } from '@utils';

import { CalendarHeader, CalendarHeaderWrapper, ArrowButton, CalendarWeek, DateItem } from './style';

interface FromDateMarked {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
}

interface FromDates {
  startDate: Dayjs;
  endDate: Dayjs;
  color?: string;
  markClass?: string;
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

const emptyPeriod = { color: 'transparent' };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calendar = ({ markedDates, isHorizontal, onChange }: CalendarProps) => {
  const [calendarDate, setCalendarDate] = useState<Dayjs>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    setCalendarDate(selectedDate);
  }, [selectedDate]);

  const calendarDates = useMemo(() => {
    return getDatesInMonth(calendarDate);
  }, [calendarDate]);

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  const handlePrevClick = () => setCalendarDate(calendarDate.add(-1, 'month'));
  const handleNextClick = () => setCalendarDate(calendarDate.add(1, 'month'));

  const generateCurrentWeek = (): React.ReactElement[] => {
    return ['일', '월', '화', '수', '목', '금', '토'].map((value: string) => <div key={value}>{value}</div>);
  };

  const renderPeriod = (index: number, item: IMarked): React.ReactElement => {
    const styles = {
      height: '4px',
      backgroundColor: item.color
    };
    return <div key={index} style={styles} />;
  };

  const renderMultiMarkings = (items?: IMarked[]) => {
    return items?.map((marked, index) => renderPeriod(index + 1, marked));
  };

  const getEmptyPeriodIndex = (prev: Record<string, FromDateMarked[]>, startDate: Dayjs, endDate: Dayjs) => {
    const totalDays = endDate.diff(startDate, 'day') + 1;

    let emptyIndex = 0;
    let freeRowFound = false;
    while (!freeRowFound) {
      freeRowFound = true;
      for (let i = 0; i < totalDays; i += 1) {
        const date = startDate.add(i, 'day');
        const dateKey = date.format('YYYY-MM-DD');

        const period = prev[dateKey]?.[emptyIndex];
        const isWithinInterval = dayjs(date).isBetween(startDate, endDate, 'day', '[]');
        if (period && isWithinInterval) {
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
        startDate: dayjs(date.startDate),
        endDate: dayjs(date.endDate)
      })) as unknown as FromDates[];
  }, [markedDates]);

  const markerDates = useMemo(() => {
    const sortDates = sortFormDates();
    const init = {} as Record<string, FromDateMarked[]>;
    return sortDates?.reduce((prev, curr) => {
      const temp = prev;
      const { startDate, endDate, color } = curr;

      const totalDays = endDate.diff(startDate, 'day') + 1;
      const emptyIndex = getEmptyPeriodIndex(prev, startDate, endDate);

      for (let i = 0; i < totalDays; i += 1) {
        const dateKey = startDate.add(i, 'day').format('YYYY-MM-DD');
        const marked = temp[dateKey] || [];
        if (marked.length <= emptyIndex) {
          marked.push({ ...emptyPeriod });
        }
        marked[emptyIndex] = { color, startingDay: !i, endingDay: i === totalDays - 1 };
        temp[dateKey] = marked;
      }
      return temp;
    }, init);
  }, [sortFormDates]);

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
      <div>{generateCurrentWeek()}</div>
      <div>
        {calendarDates.map((dates) => (
          <CalendarWeek>
            {dates.map((date) => {
              const dateKey = date.format('YYYY-MM-DD');
              const isToday = date.isToday();
              const isSelect = date.isSame(selectedDate, 'day');
              return (
                <DateItem
                  onClick={() => handleDateClick(date)}
                  className={classNames({ today: isToday, select: isSelect })}
                >
                  <span>{date.date()}</span>
                  {markerDates?.[dateKey] ? <div>{renderMultiMarkings(markerDates[dateKey])}</div> : null}
                </DateItem>
              );
            })}
          </CalendarWeek>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
