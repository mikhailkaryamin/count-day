import { StatusStorage } from "./consts";

// Components types
type children = React.ReactNode;

export type ItemType = {
  title: string;
  date: string;
};

export type RenderItemType = {
  item: {
    title: string;
    id: string;
    date: string;
  };
};

export type PropsProvider = {
  children: children;
};

export type EventItemContainerType = {
  children: children;
  bgColor: string;
}

// Reducers and context types

type EventPayload = {
  [ActionsTypes.SetCurrentEventId]: number;
  [ActionsTypes.SetDate]: Date;
  [ActionsTypes.SetTitle]: string;
  [ActionsTypes.SetCountFor]: CountFor;
  [ActionsTypes.SetCountOnlySelectionDay]: CountOnlySelectionDay;
};

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

type ModalPayload = {
  [ActionsTypes.ShowModal]: boolean;
};

export type CountFor = "hour" | "day" | "week" | "month" | "year";
export type CountOnlySelectionDay = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export type EventType = {
  id: number;
  date: Date;
  title: string;
  countFor: CountFor;
  countOnlySelectionDay: CountOnlySelectionDay,
};

export type InitialStateType = {
  showModal: boolean;
  currentEvent: EventType | null;
};

export type EventActions = ActionMap<EventPayload>[keyof ActionMap<EventPayload>];

export enum ActionsTypes {
  ShowModal = "SHOW_MODAL",
  SetCurrentEventId = "SET_CURRENT_EVENT_ID",
  SetDate = "SET_DATE",
  SetTitle = "SET_TITLE",
  SetCountFor = "SET_COUNT_FOR",
  SetCountOnlySelectionDay = "SET_COUNT_ONLY_SELECTION_DAY",
}

export type ModalActions = ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];

// hooks

export type StatusStorageType = typeof StatusStorage[keyof typeof StatusStorage] | undefined;
