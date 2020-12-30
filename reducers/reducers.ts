import { EventType, Types, ModalActions, EventActions } from "../shared/types";

const modalReducer = (state: boolean, action: ModalActions | EventActions) => {
  switch (action.type) {
    case Types.ShowModal:
      return !state;
    default:
      return state;
  }
};


const eventReducer = (state: EventType | null, action: ModalActions | EventActions) => {
  switch (action.type) {
    case Types.SetCurrentEventId:
      return {
        ...state,
        id: action.payload,
      };
    case Types.SetDate:
      return {
        ...state,
        date: action.payload,
      };
    case Types.SetTitle:
      return {
        ...state,
        title: action.payload,
      };
    case Types.SetCountFor:
      return {
        ...state,
        countFor: action.payload,
      };
    case Types.SetCountOnlySelectionDay:
      return {
        ...state,
        countOnlySelectionDay: action.payload,
      };
    default:
      return state;
  }
};

export {
  modalReducer,
  eventReducer,
};
