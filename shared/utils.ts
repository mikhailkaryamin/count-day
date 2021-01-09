import { MS, CountTypes } from "./consts";
import { CountFor } from "./types";

const calculateOffsetMS = (dateEvent: string) => {
  const currentDateMS = +(new Date());
  const dateEventMS = +(new Date(dateEvent));

  const msOffset = currentDateMS - dateEventMS;

  return msOffset;
};

const calculateOffset = (dateEvent: string, type: CountFor): string => {
  const UNDEFINED_COUNT = "undefined";
  const ms = calculateOffsetMS(dateEvent);

  switch (type) {
    case CountTypes.Day:
      return Math.floor(ms / MS.DAY).toString();
    case CountTypes.Week:
      return Math.floor(ms / MS.WEEK).toString();
    case CountTypes.Month:
      return Math.floor(ms / MS.MONTH).toString();
    case CountTypes.Year:
      return Math.floor(ms / MS.YEAR).toString();
    default:
      return UNDEFINED_COUNT;
  }
};


export {
  calculateOffset,
};
