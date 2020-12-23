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

export enum Types {
  ShowModal = "SHOW_MODAL",
  SetCurrentEventId = "SET_CURRENT_EVENT_ID",
}

type ModalPayload = {
  [Types.ShowModal]: boolean;
}
export type ModalActions = ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];

const modalReducer = (state: boolean, action: ModalActions | EventActions) => {
  switch (action.type) {
    case Types.ShowModal:
      return !state;
    default:
      return state;
  }
};

type EventType = {
  id: number;
};

type EventPayload = {
  [Types.SetCurrentEventId] : {
    id: number;
  }
}

export type EventActions = ActionMap<EventPayload>[keyof ActionMap<EventPayload>];

const eventReducer = (state: EventType | null, action: ModalActions | EventActions) => {
  switch (action.type) {
    case Types.SetCurrentEventId:
      return {
        ...state,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

export {
  modalReducer,
  eventReducer,
};
