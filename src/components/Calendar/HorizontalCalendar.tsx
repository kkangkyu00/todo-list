import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { classNames } from '@utils';

const CalenderWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  background: #fff;

  .date-group {
    display: flex;
    justify-content: space-between;
    padding: 6px;
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
    &:first-child .day {
      color: red;
    }
    &:last-child .day {
      color: blue;
    }
    .dayNumber {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .date-item.active {
    background: #c7e6f7;
  }
`;

interface HorizontalCalendarProps {
  date?: never;
}

const HorizontalCalendar = ({ date }: HorizontalCalendarProps) => {
  console.log(dayjs(date).isToday(), '########');

  const dates = useMemo(() => {
    const d = [];
    const startDate = dayjs().startOf('week');
    for (let i = 0; i < 7; i += 1) {
      const nextDate = startDate.add(i, 'day');
      const dateKey = dayjs(nextDate).format('YYYY-MM-DD');
      const dayNumber = dayjs(nextDate).format('DD');
      const day = dayjs(nextDate).format('ddd');
      d.push({ day, dayNumber, dateKey });
    }
    return d;
  }, []);

  console.log(dates, '######');
  return (
    <CalenderWrapper>
      <div className="date-group">
        {dates.map(({ day, dayNumber, dateKey }) => (
          <div key={dateKey} className={classNames('date-item', { active: dayjs().format('YYYY-MM-DD') === dateKey })}>
            <div className="day">{day}</div>
            <div className="dayNumber">{dayNumber}</div>
          </div>
        ))}
      </div>
    </CalenderWrapper>
  );
};

export default HorizontalCalendar;
