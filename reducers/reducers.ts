import { EventType, EventsListType, ActionsTypes, ActionType, OptionsAppType } from "../shared/types";

const optionsAppReducer = (state: OptionsAppType, action: ActionType) => {
  switch (action.type) {
    case ActionsTypes.ShowModal:
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
};

const eventsListReducer = (state: EventsListType | null, action: ActionType) => {
  switch (action.type) {
    case ActionsTypes.GetEventsList:
      return action.payload;
    default:
      return state;
  }
};

const eventReducer = (state: EventType | null, action: ActionType) => {
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
    case ActionsTypes.SetHighPriority:
      return {
        ...state,
        isHighPriority: action.payload,
      };
    case ActionsTypes.SetCountFor:
      return {
        ...state,
        countFor: action.payload,
      };
    case ActionsTypes.SetCountOnlySelectedDay:
      return {
        ...state,
        countOnlySelectionDay: action.payload,
      };
    case ActionsTypes.SetCurrentEvent:
      return {
        ...action.payload,
      };
    case ActionsTypes.ResetCurrentEvent:
      return null;
    default:
      return state;
  }
};

export {
  optionsAppReducer,
  eventReducer,
  eventsListReducer
};
