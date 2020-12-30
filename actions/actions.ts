import { Types, ModalActions, EventActions, CountFor } from "../shared/types";

const ActionCreator = {
  showModal: (payload: boolean): ModalActions | EventActions => ({
    type: Types.ShowModal,
    payload,
  }),
  setTitle: (payload: string): ModalActions | EventActions => ({
    type: Types.SetTitle,
    payload,
  }),
  setDate: (payload: Date): ModalActions | EventActions => ({
    type: Types.SetDate,
    payload,
  }),
  setCountFor: (payload: CountFor): ModalActions | EventActions => ({
    type: Types.SetCountFor,
    payload,
  }),
  setCountOnlySelectionDay: (payload: string[]): ModalActions | EventActions => ({
    type: Types.SetCountOnlySelectionDay,
    payload,
  }),
};


export {
  ActionCreator,
};
