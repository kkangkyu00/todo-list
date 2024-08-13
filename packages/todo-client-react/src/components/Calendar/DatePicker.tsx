import React, { useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

const DatePicker = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swiperRef, setSwiperRef] = useState<SwiperRef['swiper'] | null>(null);
  const [slideList] = useState<number[]>([1, 2, 3]);

  const handlePrevSlide = (slide: SwiperRef['swiper']) => {
    console.log(slide.realIndex, '######### prev');
    const num = slideList[slide.realIndex];
    slideList[2] = num - 1;
  };

  const handleNextSlide = (slide: SwiperRef['swiper']) => {
    console.log(slide.realIndex, '######### next');
    const num = slideList[slide.realIndex];
    slideList[0] = num + 1;
  };

  return (
    <div>
      <Swiper
        loop
        initialSlide={1}
        slidesPerView={1}
        onSwiper={setSwiperRef}
        onSlidePrevTransitionEnd={handlePrevSlide}
        onSlideNextTransitionEnd={handleNextSlide}
      >
        {slideList.map((i) => (
          <SwiperSlide>{i}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DatePicker;
