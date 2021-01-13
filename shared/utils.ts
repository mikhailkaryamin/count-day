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

  const getRoundNumber = (numberMs: number) => {
    return numberMs > 0 ? Math.floor(numberMs) : Math.ceil(numberMs);
  };

  switch (type) {
    case CountTypes.Day:
      return getRoundNumber(ms / MS.DAY);
    case CountTypes.Week:
      return getRoundNumber(ms / MS.WEEK);
    case CountTypes.Month:
      return getRoundNumber(ms / MS.MONTH);
    case CountTypes.Year:
      return getRoundNumber(ms / MS.YEAR);
    default:
      return UNDEFINED_COUNT;
  }
};

const calculateOffsetSelectedDays = (dateEvent: string, selectedDays: CountOnlySelectedDays): number => {
  const DAYS_OF_WEEK = 6;
  const DAYS_OF_TWO_WEEKS = 13;

  const getCountSelectedDaysOfWeek = (selectedDaysValues: boolean[]) => {
    return selectedDaysValues.reduce((acc, curVal) => {
      return acc + +curVal;
    }, 0);
  };

  const date = new Date(dateEvent);
  const countDay = Math.abs(calculateOffset(dateEvent, CountTypes.Day));
  const countWeek = Math.abs(calculateOffset(dateEvent, CountTypes.Week));

  const selectedDaysOfWeek = selectedDays.map((dayItem) => dayItem[1]);
  const currentDayOfWeek = new Date().getDay();
  const lastDayFirstWeek = currentDayOfWeek + countDay;
  const finishDayOfWeek = date.getDay() - 1;

  const countSelectedDaysOnWeek = getCountSelectedDaysOfWeek(selectedDaysOfWeek);
  const firstWeekSelectedDays = getCountSelectedDaysOfWeek(selectedDaysOfWeek.slice(currentDayOfWeek, lastDayFirstWeek));
  const lastWeekSelectedDays = getCountSelectedDaysOfWeek(selectedDaysOfWeek.slice(0, finishDayOfWeek));

  switch (true) {
    case (countDay + firstWeekSelectedDays) <= DAYS_OF_WEEK:
      return firstWeekSelectedDays;
    case (countDay + firstWeekSelectedDays) <= DAYS_OF_TWO_WEEKS:
      return firstWeekSelectedDays + lastWeekSelectedDays;
    default:
      return firstWeekSelectedDays + lastWeekSelectedDays + (countWeek * countSelectedDaysOnWeek);
  }

};

export {
  calculateOffset,
  calculateOffsetSelectedDays,
};
