import { ActionsTypes, ActionType, CountFor, CountOnlySelectionDay, EventType } from "../shared/types";

const ActionCreator = {
  getEventsList: (payload: EventType[]): ActionType => ({
    type: ActionsTypes.GetEventsList,
    payload,
  }),
  showModal: (payload: boolean): ActionType => ({
    type: ActionsTypes.ShowModal,
    payload,
  }),
  setTitle: (payload: string): ActionType => ({
    type: ActionsTypes.SetTitle,
    payload,
  }),
  setDate: (payload: string): ActionType => ({
    type: ActionsTypes.SetDate,
    payload,
  }),
  setCountFor: (payload: CountFor): ActionType => ({
    type: ActionsTypes.SetCountFor,
    payload,
  }),
  setCountOnlySelectionDay: (payload: CountOnlySelectionDay): ActionType => ({
    type: ActionsTypes.SetCountOnlySelectionDay,
    payload,
  }),
  setCurrentEvent: (payload: EventType): ActionType => ({
    type: ActionsTypes.SetCurrentEvent,
    payload,
  }),
  resetCurrentEvent: (): ActionType => ({
    type: ActionsTypes.ResetCurrentEvent,
  }),
};


export {
  ActionCreator,
};
