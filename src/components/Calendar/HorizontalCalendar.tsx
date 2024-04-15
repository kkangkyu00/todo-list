import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const CalenderWrapper = styled.div`
  width: 100%;
  height: 100%;
  .date-group {
    display: flex;
    justify-content: space-between;
  }
  .date-item {
    width: 12%;
    height: 100%;

    .day,
    .dayNumber {
      font-size: 14px;
      font-weight: 600;
    }
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
      const dayNumber = dayjs(nextDate).format('DD');
      const day = dayjs(nextDate).format('ddd');
      d.push({ day, dayNumber });
    }
    return d;
  }, []);

  console.log(dates, '######');
  return (
    <CalenderWrapper>
      <div className="date-group">
        {dates.map(({ day, dayNumber }) => {
          return (
            <div key={dayNumber} className="date-item">
              <div className="day">{day}</div>
              <div className="dayNumber">{dayNumber}</div>
            </div>
          );
        })}
      </div>
    </CalenderWrapper>
  );
};

export default HorizontalCalendar;
