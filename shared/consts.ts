const ColorScheme = {
  DARK_BLUE_MAIN: "#12232E",
  DARK_BLUE_SUB: "#203647",
  LIGHT_WHITE: "#EEFBFB",
  LIGHTER_BLUE: "#007CC7",
  LIGHTEST_BLUE: "#4DA8DA",
} as const;

const StatusStorage = {
  ERROR: "error",
  SUCCESS: "success",
} as const;

const KeyStorage = {
  EVENT: "@events_storage"
};

export {
  ColorScheme,
  KeyStorage,
  StatusStorage,
};
