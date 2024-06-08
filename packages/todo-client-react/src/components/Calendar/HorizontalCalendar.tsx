/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import SwiperCore from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { useCalendarState } from '@hooks';
import { classNames, getDatesFromRange } from '@utils';

import { CalenderWrapper } from './style';

interface HorizontalCalendarProps {
  date?: Dayjs | string;
  onChange?: (date: Dayjs | string) => void;
}

interface WeekCardProps {
  week?: Dayjs[];
}

const WeekCard = ({ week }: WeekCardProps) => {
  return (
    <div className="swiper-slide">
      {week?.map((date) => {
        const dateKey = dayjs(date).format('YYYY-MM-DD');
        const dayNumber = dayjs(date).format('DD');
        const day = dayjs(date).format('ddd');
        const isActive = classNames('date-item', { active: dayjs().format('YYYY-MM-DD') === dateKey });
        return (
          <div key={dateKey} className={isActive}>
            <div className="day">{day}</div>
            <div className="dayNumber">{dayNumber}</div>
          </div>
        );
      })}
    </div>
  );
};

const getDaysInWeek = (date: Dayjs, num: number) => {
  const byDate = dayjs(date).add(num, 'week');
  const startDate = dayjs(byDate).startOf('week');
  const endDate = dayjs(byDate).endOf('week');
  return getDatesFromRange(startDate, endDate);
};

const HorizontalCalendar = ({ date, onChange }: HorizontalCalendarProps) => {
  const { selectedDate = dayjs(), setCalendarState } = useCalendarState();

  const handleSlideChange = useCallback(
    (slide: SwiperRef['swiper']) => {
      const { realIndex } = slide;
      console.log('################', realIndex);
      const num = realIndex + -1;
      setTimeout(() => {
        setCalendarState({
          selectedDate: selectedDate.add(num, 'week')
        });
      }, 300);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedDate]
  );

  if (!selectedDate) return null;
  return (
    <CalenderWrapper>
      <div className="date-group" key={selectedDate.format('YYYY-MM-DD')}>
        <Swiper onActiveIndexChange={handleSlideChange} initialSlide={1}>
          {new Array(3).fill(0).map((_, i) => (
            <SwiperSlide>
              <WeekCard week={getDaysInWeek(selectedDate, i + -1)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </CalenderWrapper>
  );
};

export default HorizontalCalendar;
