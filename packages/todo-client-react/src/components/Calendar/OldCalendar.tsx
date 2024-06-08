import React, { useCallback, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SwiperCore from 'swiper';
import { Manipulation, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import dayjs, { Dayjs } from 'dayjs';

import { classNames } from '@utils';
import { CalenderWrapper } from './style';

SwiperCore.use([Pagination, Navigation, Manipulation]);

interface HorizontalCalendarProps {
  date?: Dayjs | string;
  onChange?: (date: Dayjs | string) => void;
}

const getDatesFromRange = (startDate: Dayjs, endDate: Dayjs): Array<Dayjs> => {
  const dates: Array<Dayjs> = [];
  let currDate = startDate;

  while (!currDate.isAfter(endDate)) {
    dates.push(currDate);
    currDate = currDate.add(1, 'day');
  }
  return dates;
};

const getDate = (dates: Dayjs[], onClick: (date: Dayjs) => void) => (
  <div className="swiper-slide">
    {dates.map((date) => {
      const dateKey = dayjs(date).format('YYYY-MM-DD');
      const dayNumber = dayjs(date).format('DD');
      const day = dayjs(date).format('ddd');
      const isActive = classNames('date-item', { active: dayjs().format('YYYY-MM-DD') === dateKey });
      return (
        <div
          key={dateKey}
          role="button"
          tabIndex={0}
          onClick={() => onClick(date)}
          onKeyDown={() => onClick(date)}
          className={isActive}
        >
          <div className="day">{day}</div>
          <div className="dayNumber">{dayNumber}</div>
        </div>
      );
    })}
  </div>
);

const getDaysInWeek = (date: Dayjs, num: number) => {
  const byDate = dayjs(date).add(num, 'week');
  const startDate = dayjs(byDate).startOf('week');
  const endDate = dayjs(byDate).endOf('week');
  return getDatesFromRange(startDate, endDate);
};

const HorizontalCalendar = ({ date, onChange }: HorizontalCalendarProps) => {
  console.log(date);
  const [swiperRef, setSwiperRef] = useState<SwiperRef['swiper'] | null>(null);
  const [activeDate, setActiveDate] = useState(dayjs());

  const handleDateClick = useCallback((clickDate: Dayjs) => onChange?.(clickDate), [onChange]);

  const handleDateChange = (slide: SwiperRef['swiper']) => {
    if (!swiperRef) return;
    const { realIndex } = slide;
    const num = realIndex + -1;

    const currDate = activeDate.add(num, 'week');
    const weeks = getDaysInWeek(currDate, num);
    const com = getDate(weeks, handleDateClick);
    const staticElement = renderToStaticMarkup(com);

    setTimeout(() => {
      if (realIndex === 0) {
        swiperRef.prependSlide(staticElement);
        swiperRef.removeSlide(3);
      } else if (realIndex === 2) {
        swiperRef.appendSlide(staticElement);
        swiperRef.removeSlide(0);
      }
    }, 500);
    setActiveDate(currDate);
  };
  const handleDateCallback = useCallback(handleDateChange, [swiperRef, activeDate, handleDateClick]);

  const swiperItem = useMemo(() => {
    const defaultWeeks = [-1, 0, 1];
    return defaultWeeks.map((item) => {
      const week = getDaysInWeek(dayjs(), item);
      return getDate(week, handleDateClick);
    });
  }, [handleDateClick]);

  return (
    <CalenderWrapper>
      <div className="date-group">
        <Swiper initialSlide={1} draggable onSwiper={setSwiperRef} onSlideChange={handleDateCallback}>
          {swiperItem.map((item) => (
            <SwiperSlide>{item}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </CalenderWrapper>
  );
};

export default HorizontalCalendar;
