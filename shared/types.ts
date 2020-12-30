// Components types
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
  children: React.ReactNode;
};


// Reducers and context types

type EventPayload = {
  [Types.SetCurrentEventId]: number;
  [Types.SetDate]: Date;
  [Types.SetTitle]: string;
  [Types.SetCountFor]: CountFor;
  [Types.SetCountOnlySelectionDay]: string[];
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
  [Types.ShowModal]: boolean;
};

export type CountFor = "hour" | "day" | "week" | "month" | "year";

export type EventType = {
  id: number;
  date: Date;
  title: string;
  countFor: CountFor;
  countOnlySelectionDay: string[],
};

export type InitialStateType = {
  showModal: boolean;
  currentEvent: EventType | null;
};

export type EventActions = ActionMap<EventPayload>[keyof ActionMap<EventPayload>];

export enum Types {
  ShowModal = "SHOW_MODAL",
  SetCurrentEventId = "SET_CURRENT_EVENT_ID",
  SetDate = "SET_DATE",
  SetTitle = "SET_TITLE",
  SetCountFor = "SET_COUNT_FOR",
  SetCountOnlySelectionDay = "SET_COUNT_ONLY_SELECTION_DAY",
}

export type ModalActions = ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];
