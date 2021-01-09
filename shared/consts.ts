const CountTypes = {
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year",
} as const;

const ColorScheme = {
  DARK_BLUE_MAIN: "#12232E",
  DARK_BLUE_SUB: "#203647",
  LIGHT_WHITE: "#EEFBFB",
  LIGHTER_BLUE: "#007CC7",
  LIGHTEST_BLUE: "#4DA8DA",
} as const;

const KeyStorage = {
  EVENT: "@events_storage"
};

const MS = {
  YEAR: 31556952000,
  MONTH: 2629800000,
  WEEK: 604800000,
  DAY: 86400000,
};

const StatusStorage = {
  ERROR: "error",
  SUCCESS: "success",
} as const;


export {
  CountTypes,
  ColorScheme,
  KeyStorage,
  MS,
  StatusStorage,
};
