import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWeather } from '@hooks/weather';

const WeatherWrapper = styled.div`
  .currentTemp {
    font-size: 36px;
    font-weight: 700;
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
      <div className="currentTemp">{Math.round(weather?.main?.temp)}°C</div>
      <div>체감온도 {Math.round(weather?.main?.feels_like)}°</div>
    </WeatherWrapper>
  );
};

export default WeatherContainer;
