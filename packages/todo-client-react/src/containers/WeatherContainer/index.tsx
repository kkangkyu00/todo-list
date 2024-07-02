import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWeather } from '@hooks/weather';
import dayjs from 'dayjs';

const WeatherWrapper = styled.div`
  padding: 8px 16px;
  border-radius: 8px;
  color: #3c3d48;
  background: #ffffff;
  font-size: 16px;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  .currentTemp {
    padding-bottom: 8px;
    font-size: 24px;
    font-weight: 700;
  }
  .feels-like {
    font-size: 14px;
  }
  .temp-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const WeatherContainer = () => {
  const { mutate, data: weather } = useWeather();

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      mutate({ lat: latitude, lon: longitude });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeatherWrapper>
      <div>
        <div>
          <div className="currentTemp">{Math.round(weather?.main?.temp)}°C</div>
          <div>{weather?.weather[0]?.description}</div>
          <div className="feels-like">{dayjs().format('YYYY.MM.DD')}</div>
        </div>
        <div>대충 아이콘</div>
      </div>
      <div className="temp-group">
        <div>31° / 22°</div>
        <div>체감온도 {Math.round(weather?.main?.feels_like)}°</div>
      </div>
    </WeatherWrapper>
  );
};

export default WeatherContainer;
