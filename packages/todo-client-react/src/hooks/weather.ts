import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_KEY = 'd7b316f30de0bc8e563a48cce1324102';

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: { 'Content-Type': 'application/json' }
});

export interface IPosition {
  lat: number;
  lon: number;
}

export const getWeather = async ({ lat, lon }: IPosition) => {
  const { data } = await apiClient.get(`weather?&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);
  return data;
};

export const useWeather = () => useMutation({ mutationKey: ['getWeather'], mutationFn: getWeather });
