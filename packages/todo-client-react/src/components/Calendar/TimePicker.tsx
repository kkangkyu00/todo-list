import React, { useState } from 'react';
import { Swiper, SwiperRef, SwiperProps, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

const TimePickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(100% - 64px);
  height: 100%;
  padding: 0 32px;

  .swiper {
    width: 100%;
    height: 80px;
  }
  .swiper-vertical > .swiper-wrapper {
    //gap: 6px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  user-select: none;
  opacity: 0.25;
  transition: opacity 0.3s ease;
  cursor: default;
  font-weight: bold;
  -webkit-tap-highlight-color: transparent;
`;

// const TIME_MINUTES =

const TimePicker: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swiperRef, setSwiperRef] = useState<SwiperRef['swiper'] | null>(null);
  const swiperDefaultOption: SwiperProps = {
    centeredSlides: true,
    direction: 'vertical',
    loop: true,
    loopAdditionalSlides: 5,
    slidesPerView: 3,
    slideToClickedSlide: true,
    onSwiper: setSwiperRef,
    mousewheel: {
      enabled: true,
      sensitivity: 0.5
    }
  };

  return (
    <TimePickerContainer>
      <Swiper {...swiperDefaultOption} loop={false} className="swiper-ampm">
        <StyledSwiperSlide>오전</StyledSwiperSlide>
        <StyledSwiperSlide>오후</StyledSwiperSlide>
      </Swiper>
      <Swiper {...swiperDefaultOption} className="swiper-hours">
        {new Array(12).fill(0).map((_, i) => (
          <StyledSwiperSlide>{i + 1}</StyledSwiperSlide>
        ))}
      </Swiper>
      <div className="">:</div>
      <Swiper {...swiperDefaultOption} className="swiper-minutes">
        {new Array(60).fill(0).map((_, i) => (
          <StyledSwiperSlide>{String(i).padStart(2, '0')}</StyledSwiperSlide>
        ))}
      </Swiper>
    </TimePickerContainer>
  );
};

export default TimePicker;

// pagination: '.swiper-pagination',
// slidesPerView: 3,
// freeMode: true,
// freeModeSticky: true,
// freeModeMomentumRatio: 0.25,
// freeModeVelocityRatio: 0.25,
// freeModeMinimumVelocity: 0.1,
// mousewheelControl: true,
// mousewheelSensitivity: 0.5,
// loop: true,
// loopAdditionalSlides: 5,
// direction: 'vertical',
// slideToClickedSlide: true,
// centeredSlides: true
