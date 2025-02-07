import React, { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Box } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { getDatesInWeek, getDatesInMonth, sortMarkedDates, classNames } from '@utils';

const DatePickerContainer = styled.div``;
const DatePickerHeader = styled.div``;
const WeekItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const DateItem = styled.div`
  width: 40px;
  text-align: center;

  &.today span {
    width: 24px;
    height: 24px;
    background: #bbbdc7;
    color: #0f172a;
  }
  &.select span {
    width: 24px;
    height: 24px;
    background: #9f1239;
    color: #fff;
  }
`;
const DaysItem = styled.div`
  width: 40px;
  text-align: center;
`;
const Marker = styled.div<{ shape: 'plot' | 'dot' }>`
  width: 100%;
  height: 2px;
  background: blue;
`;

export type TDateType = 'month' | 'week';
export interface IMarked {
  startDate: Dayjs | string;
  endDate: Dayjs | string;
  color?: string;
  markClass?: string;
}
export interface IMarkedForm {
  isStartDate?: boolean;
  isEndDate?: boolean;
  color?: string;
}

interface DatePickerProps {
  date?: Dayjs | string;
  dateType?: TDateType;
  onChange?: (value: Dayjs) => void;
  markedDates?: IMarked[];
}

const EMPTY_MARKED = { color: 'transparent' };

const DatePicker = ({ date, dateType = 'month', markedDates, onChange }: DatePickerProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperRef['swiper'] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(date));
  const [calendarDate, setCalendarDate] = useState<Dayjs[]>([
    dayjs().add(-1, dateType),
    dayjs(),
    dayjs().add(1, dateType)
  ]);

  const handlePrevSlide = (slide: SwiperRef['swiper']) => {
    const dates = calendarDate;
    dates[(slide.realIndex + 2) % 3] = dates[slide.realIndex].add(-1, dateType);
    setCalendarDate(() => [...dates]);
  };

  const handleNextSlide = (slide: SwiperRef['swiper']) => {
    const dates = calendarDate;
    dates[(slide.realIndex + 1) % 3] = dates[slide.realIndex].add(1, dateType);
    setCalendarDate(() => [...dates]);
  };

  const marked = useMemo(() => {
    if (!markedDates?.length) return {};
    const init = {} as Record<string, IMarkedForm[]>;
    const array = sortMarkedDates(markedDates);

    return array?.reduce((prev, curr) => {
      const temp = prev;
      const { startDate, endDate, color } = curr;

      let emptyIndex = 0;
      const totalDays = dayjs(endDate).diff(startDate, 'day') + 1;
      for (let i = 0; i < totalDays; i += 1) {
        const dateKey = dayjs(startDate).add(i, 'day').format('YYYY-MM-DD');
        const markedForms = temp[dateKey] || [];

        while (markedForms?.[emptyIndex]) {
          emptyIndex += 1;
        }
        if (markedForms.length <= emptyIndex) {
          markedForms.push({ ...EMPTY_MARKED });
        }
        markedForms[emptyIndex] = { color, isStartDate: !i, isEndDate: i === totalDays - 1 };
        temp[dateKey] = markedForms;
      }
      return temp;
    }, init);
  }, [markedDates]);

  const handleDateClick = (d: Dayjs) => {
    onChange?.(d);
    setSelectedDate(d);
  };

  const generateDayOfWeek = (): React.ReactElement[] => {
    return ['일', '월', '화', '수', '목', '금', '토'].map((value: string) => <DaysItem key={value}>{value}</DaysItem>);
  };

  const renderMarked = (items: IMarkedForm[]) => {
    return items?.map(() => <Marker shape="dot" />);
  };

  const renderDates = (value: Dayjs): React.ReactElement[] => {
    const weeks = dateType === 'month' ? getDatesInMonth(value) : [getDatesInWeek(value)];
    return weeks.map((week) => (
      <WeekItem>
        {week.map((d) => {
          const dateKey = d.format('YYYY-MM-DD');
          const isToday = d.isToday();
          const isSelected = d.isSame(selectedDate, 'day');
          return (
            <DateItem className={classNames({ today: isToday, select: isSelected })} onClick={() => handleDateClick(d)}>
              <span>{d.date()}</span>
              {marked?.[dateKey] ? renderMarked(marked[dateKey]) : null}
            </DateItem>
          );
        })}
      </WeekItem>
    ));
  };

  const activeIndex = swiperRef?.realIndex || 0;
  return (
    <DatePickerContainer>
      <DatePickerHeader>
        <Box display="flex" alignItems="center">
          <KeyboardArrowLeft onClick={() => swiperRef?.slidePrev()} />
          <Box>
            {calendarDate[activeIndex].year()} {calendarDate[activeIndex].month() + 1}월
          </Box>
          <KeyboardArrowRight onClick={() => swiperRef?.slideNext()} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-around">
          {generateDayOfWeek()}
        </Box>
      </DatePickerHeader>
      <Swiper
        loop
        initialSlide={1}
        slidesPerView={1}
        onSwiper={setSwiperRef}
        onSlidePrevTransitionEnd={handlePrevSlide}
        onSlideNextTransitionEnd={handleNextSlide}
      >
        {calendarDate.map((d) => (
          <SwiperSlide>{renderDates(d)}</SwiperSlide>
        ))}
      </Swiper>
    </DatePickerContainer>
  );
};

export default DatePicker;
