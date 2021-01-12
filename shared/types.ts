import { StatusStorage, CountTypes } from "./consts";

// Components types
type children = React.ReactNode;

export type ItemType = {
  title: string;
  date: string;
  countDate: string;
  countType: string;
  onPressItem: () => void;
};

export type RenderItemType = {
  item: {
    title: string;
    id: string;
    date: string;
    countDate: string;
    countType: string;
  };
};

export type PropsProvider = {
  children: children;
};

export type PropsEventItemContainer = {
  children: children;
  bgColor: string;
}

export type PropsEventEdit = {
  onNeededRead: () => void;
}

// Reducers and context types
export type InitialStateType = {
  optionsApp: {
    showModal: boolean;
  };
  currentEvent: EventType | null;
  events: EventsListType | null;
};
export enum ActionsTypes {
  GetEventsList = "GET_EVENTS_LIST",
  ShowModal = "SHOW_MODAL",
  SetCurrentEventId = "SET_CURRENT_EVENT_ID",
  SetDate = "SET_DATE",
  SetTitle = "SET_TITLE",
  SetCountFor = "SET_COUNT_FOR",
  SetCountOnlySelectionDay = "SET_COUNT_ONLY_SELECTION_DAY",
  SetCurrentEvent = "SET_CURRENT_EVENT",
  ResetCurrentEvent = "RESET_CURRENT_EVENT",
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export type CountFor = typeof CountTypes[keyof typeof CountTypes];

export type CountOnlySelectionDay = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

type EventPayload = {
  [ActionsTypes.SetCurrentEventId]: string;
  [ActionsTypes.SetDate]: string;
  [ActionsTypes.SetTitle]: string;
  [ActionsTypes.SetCountFor]: CountFor;
  [ActionsTypes.SetCountOnlySelectionDay]: CountOnlySelectionDay;
  [ActionsTypes.SetCurrentEvent]: EventType;
  [ActionsTypes.ResetCurrentEvent];
};

type EventActions = ActionMap<EventPayload>[keyof ActionMap<EventPayload>];

export type EventType = {
  id: string;
  date: string;
  title: string;
  countFor: CountFor;
  countOnlySelectionDay: CountOnlySelectionDay,
};

type OptionsAppPayload = {
  [ActionsTypes.ShowModal]: boolean;
};
type OptionsAppActions = ActionMap<OptionsAppPayload>[keyof ActionMap<OptionsAppPayload>];

export type OptionsAppType = {
  showModal: boolean;
}

type EventsListPayload = {
  [ActionsTypes.GetEventsList]: EventType[];
}
type EventsListActions = ActionMap<EventsListPayload>[keyof ActionMap<EventsListPayload>];
export type EventsListType = EventType[];

export type ActionType = EventsListActions | OptionsAppActions | EventActions;

// hooks
export type StatusStorageType = typeof StatusStorage[keyof typeof StatusStorage] | undefined;
export type DataStorage = string[][];
