import React, { createContext, useReducer, Dispatch } from "react";
import {
  modalReducer,
  eventReducer,
} from "../reducers/reducers";

import { InitialStateType, PropsProvider, EventActions, ModalActions } from "./types";

const initialState = {
  showModal: false,
  currentEvent: null,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<EventActions | ModalActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
    { showModal, currentEvent }: InitialStateType,
    action: EventActions | ModalActions
) => ({
  showModal: modalReducer(showModal, action),
  currentEvent: eventReducer(currentEvent, action),
});

const AppProvider: React.FC<PropsProvider> = ({ children }: PropsProvider) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
