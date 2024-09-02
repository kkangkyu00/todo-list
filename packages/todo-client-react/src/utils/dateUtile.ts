import dayjs, { Dayjs } from 'dayjs';

export const getDatesFromRange = (startDate: Dayjs, endDate: Dayjs): Array<Dayjs> => {
  const dates: Array<Dayjs> = [];
  let currDate = startDate;

  while (!currDate.isAfter(endDate)) {
    dates.push(currDate);
    currDate = currDate.add(1, 'day');
  }
  return dates;
};

// export const getDatesInWeek = (date: Dayjs) => {
//   const startDate = date.startOf('week');
//   const endDate = date.endOf('week');
//   return getDatesFromRange(startDate, endDate);
// };

export const getWeekOfMonth = (date: Dayjs) => {
  const currentDate = date.date();
  const firstDay = date.startOf('month').day();
  return Math.ceil((currentDate + firstDay) / 7);
};

/**
 * 달력 날짜 구하기
 */
const getPrevDates = (date: Dayjs | string) => {
  const firstDayOfMonth = dayjs(date).startOf('month').day();
  const dates: Dayjs[] = [];

  for (let idx = firstDayOfMonth; idx > 0; idx -= 1) {
    const startDate = dayjs(date).startOf('month');
    dates.push(dayjs(startDate).add(-idx, 'day'));
  }
  return dates;
};

const getNextDates = (date: Dayjs | string) => {
  const lastDayOfMonth = dayjs(date).endOf('month').day();
  const dates: Dayjs[] = [];

  for (let idx = 1; idx <= 6 - lastDayOfMonth; idx += 1) {
    const endDate = dayjs(date).endOf('month');
    dates.push(dayjs(endDate).add(idx, 'day'));
  }
  return dates;
};

const gatCurrentDates = (date: Dayjs | string) => {
  const startDate = dayjs(date).startOf('month');
  const endDate = dayjs(date).endOf('month');
  const dates: Dayjs[] = [];

  for (let d = startDate; d.isBefore(endDate); d = d.add(1, 'day')) {
    dates.push(d);
  }
  return dates;
};

export const getDatesInMonth = (selectedDate: Dayjs) => {
  const prevDates = getPrevDates(selectedDate);
  const nextDates = getNextDates(selectedDate);
  const currentDates = gatCurrentDates(selectedDate);

  const array = [...prevDates, ...currentDates, ...nextDates];
  const answer = [];
  for (let i = 0; i < array.length / 7; i += 1) {
    answer.push(array.slice(i * 7, i * 7 + 7));
  }
  return answer;
};

export const getDatesInWeek = (selectedDate: Dayjs) => {
  const startDate = selectedDate.startOf('week');
  const endDate = selectedDate.endOf('week');
  const dates: Dayjs[] = [];

  for (let d = startDate; d.isBefore(endDate); d = d.add(1, 'day')) {
    dates.push(d);
  }
  return dates;
}
