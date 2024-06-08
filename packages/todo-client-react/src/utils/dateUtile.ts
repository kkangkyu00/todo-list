import { Dayjs } from 'dayjs';

export const getDatesFromRange = (startDate: Dayjs, endDate: Dayjs): Array<Dayjs> => {
  const dates: Array<Dayjs> = [];
  let currDate = startDate;

  while (!currDate.isAfter(endDate)) {
    dates.push(currDate);
    currDate = currDate.add(1, 'day');
  }
  return dates;
};

export const getDatesInWeek = (date: Dayjs) => {
  const startDate = date.startOf('week');
  const endDate = date.endOf('week');
  return getDatesFromRange(startDate, endDate);
};
