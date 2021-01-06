import { ActionsTypes, ModalActions, EventActions, CountFor, CountOnlySelectionDay } from "../shared/types";

const ActionCreator = {
  showModal: (payload: boolean): ModalActions | EventActions => ({
    type: ActionsTypes.ShowModal,
    payload,
  }),
  setTitle: (payload: string): ModalActions | EventActions => ({
    type: ActionsTypes.SetTitle,
    payload,
  }),
  setDate: (payload: Date): ModalActions | EventActions => ({
    type: ActionsTypes.SetDate,
    payload,
  }),
  setCountFor: (payload: CountFor): ModalActions | EventActions => ({
    type: ActionsTypes.SetCountFor,
    payload,
  }),
  setCountOnlySelectionDay: (payload: CountOnlySelectionDay): ModalActions | EventActions => ({
    type: ActionsTypes.SetCountOnlySelectionDay,
    payload,
  }),
};


export {
  ActionCreator,
};
