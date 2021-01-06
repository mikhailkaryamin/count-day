import { EventType, ActionsTypes, ModalActions, EventActions } from "../shared/types";

const modalReducer = (state: boolean, action: ModalActions | EventActions) => {
  switch (action.type) {
    case ActionsTypes.ShowModal:
      return !state;
    default:
      return state;
  }
};


const eventReducer = (state: EventType | null, action: ModalActions | EventActions) => {
  switch (action.type) {
    case ActionsTypes.SetCurrentEventId:
      return {
        ...state,
        id: action.payload,
      };
    case ActionsTypes.SetDate:
      return {
        ...state,
        date: action.payload,
      };
    case ActionsTypes.SetTitle:
      return {
        ...state,
        title: action.payload,
      };
    case ActionsTypes.SetCountFor:
      return {
        ...state,
        countFor: action.payload,
      };
    case ActionsTypes.SetCountOnlySelectionDay:
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
