import { Types, ModalActions, EventActions } from "../reducers/reducers";

const ActionCreator = {
  showModal: (payload): ModalActions | EventActions => ({
    type: Types.ShowModal,
    payload,
  })
};


export {
  ActionCreator,
};
