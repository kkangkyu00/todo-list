import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { calendarState } from './atom/calendarAtom';

export const useSetCalendarState = () => useSetRecoilState(calendarState);

export const useCalendarState = () => {
  const setCalendarState = useSetRecoilState(calendarState);
  const resetState = useResetRecoilState(calendarState);
  const value = useRecoilValue(calendarState);

  return { setCalendarState, resetState, ...value };
};
