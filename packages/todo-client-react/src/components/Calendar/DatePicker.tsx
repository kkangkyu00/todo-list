import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import dayjs, { Dayjs } from 'dayjs';
import { DaysItem } from '@components/Calendar/style';
import { getDatesInMonth, getDatesInWeek } from '@utils';

interface DatePickerProps {
  date?: Dayjs | string;
  dateType?: 'month' | 'week';
  onChange?: (value: Dayjs) => void;
}

/* eslint-disable @typescript-eslint/no-unused-vars */

const DatePicker = ({ date, dateType, onChange }: DatePickerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swiperRef, setSwiperRef] = useState<SwiperRef['swiper'] | null>(null);
  const [slideList, setSlideList] = useState<number[]>([1, 2, 3]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [focusDate, setFocusDate] = useState<Dayjs[]>([dayjs().add(-1, 'month'), dayjs(), dayjs().add(1, 'month')]);

  const handlePrevSlide = (slide: SwiperRef['swiper']) => {
    const [prevDate, currDate, nextData] = focusDate;
    setFocusDate([prevDate, currDate, nextData.add(-1, 'month')]);
  };

  const handleNextSlide = (slide: SwiperRef['swiper']) => {
    const index = (slide.realIndex + 1) % 3;
    console.log(focusDate[index].format('MM'), '############', index);
    focusDate[index] = focusDate[slide.realIndex].add(1, 'month');
  };
  // ===============================

  const generateDayOfWeek = (): React.ReactElement[] => {
    return ['일', '월', '화', '수', '목', '금', '토'].map((value: string) => <DaysItem key={value}>{value}</DaysItem>);
  };

  const calendarDates = useMemo(() => {
    return dateType === 'month' ? getDatesInMonth(selectedDate) : getDatesInWeek(selectedDate);
  }, [selectedDate, dateType]);

  const [prevDate, currDate, nextData] = focusDate;
  return (
    <div>
      <div>{generateDayOfWeek()}</div>
      <Swiper
        loop
        initialSlide={1}
        slidesPerView={1}
        onSwiper={setSwiperRef}
        onSlidePrevTransitionEnd={handlePrevSlide}
        onSlideNextTransitionEnd={handleNextSlide}
      >
        <SwiperSlide>{prevDate.format('MM')}</SwiperSlide>
        <SwiperSlide>{currDate.format('MM')}</SwiperSlide>
        <SwiperSlide>{nextData.format('MM')}</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DatePicker;
