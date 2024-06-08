import { atom } from 'recoil';
import { Dayjs } from 'dayjs';

export interface TCalendarState {
  selectedDate: Dayjs;
  // onDateSelected: () => void;
}

export const calendarState = atom<TCalendarState | null>({
  key: 'calendarState',
  default: null
});
