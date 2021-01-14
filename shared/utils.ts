import { MS, CountTypes } from "./consts";
import { CountFor, CountOnlySelectedDays } from "./types";

const calculateOffsetMS = (dateEvent: string) => {
  const currentDateMS = +(new Date());
  const dateEventMS = +(new Date(dateEvent));

  const msOffset = currentDateMS - dateEventMS;

  return msOffset;
};

const calculateOffset = (dateEvent: string, type: CountFor): number => {
  const UNDEFINED_COUNT = 0;
  const ms = calculateOffsetMS(dateEvent);

  switch (type) {
    case CountTypes.Day:
      return Math.floor(ms / MS.DAY);
    case CountTypes.Week:
      return Math.floor(ms / MS.WEEK);
    case CountTypes.Month:
      return Math.floor(ms / MS.MONTH);
    case CountTypes.Year:
      return Math.floor(ms / MS.YEAR);
    default:
      return UNDEFINED_COUNT;
  }
};

const calculateOffsetSelectedDays = (dateEvent: string, selectedDays: CountOnlySelectedDays): number => {
  const getCountSelectedDaysOfWeek = (selectedDaysValues: boolean[]) => {
    return selectedDaysValues.reduce((acc, curVal) => {
      return acc + +curVal;
    }, 0);
  };

  const date = new Date(dateEvent);
  const countDay = Math.abs(calculateOffset(dateEvent, CountTypes.Day));
  const countWeek = Math.abs(calculateOffset(dateEvent, CountTypes.Week));
  const isDateBeforeCurrentDate = date < new Date();

  const selectedDaysOfWeek = selectedDays.map((dayItem) => dayItem[1]);
  const firstDayOfFirstWeek = isDateBeforeCurrentDate ? date.getDay() : new Date().getDay();
  const lastDayFirstWeek = firstDayOfFirstWeek + countDay;
  const finishDayOfLastWeek = isDateBeforeCurrentDate ? new Date().getDay() : date.getDay();

  const countSelectedDaysOnWeek = getCountSelectedDaysOfWeek(selectedDaysOfWeek);
  const firstWeekSelectedDays = getCountSelectedDaysOfWeek(
      selectedDaysOfWeek.slice(firstDayOfFirstWeek, lastDayFirstWeek)
  );
  const lastWeekSelectedDays = getCountSelectedDaysOfWeek(
      selectedDaysOfWeek.slice(0, finishDayOfLastWeek)
  );

  let offsetSelectedDays;

  const DAYS_OF_WEEK = 6;
  const DAYS_OF_TWO_WEEKS = 13;
  const isOnlyOneWeek = (countDay + firstWeekSelectedDays) <= DAYS_OF_WEEK;
  const isOnlyTwoWeeks = (countDay + firstWeekSelectedDays) <= DAYS_OF_TWO_WEEKS;

  switch (true) {
    case isOnlyOneWeek:
      offsetSelectedDays = firstWeekSelectedDays;
      break;
    case isOnlyTwoWeeks:
      offsetSelectedDays = firstWeekSelectedDays + lastWeekSelectedDays;
      break;
    default:
      offsetSelectedDays = firstWeekSelectedDays + lastWeekSelectedDays + (countWeek * countSelectedDaysOnWeek);
  }

  if (!isDateBeforeCurrentDate) {
    offsetSelectedDays *= -1;
  }

  return offsetSelectedDays;
};

export {
  calculateOffset,
  calculateOffsetSelectedDays,
};
