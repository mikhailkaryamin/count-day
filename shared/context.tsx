import React, { createContext, useReducer, Dispatch } from "react";
import {
  optionsAppReducer,
  eventReducer,
  eventsListReducer
} from "../reducers/reducers";

import { InitialStateType, PropsProvider, ActionType } from "./types";

const initialState = {
  optionsApp: {
    showModal: false,
  },
  currentEvent: null,
  events: null,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
    { optionsApp, currentEvent, events }: InitialStateType,
    action: ActionType
) => ({
  optionsApp: optionsAppReducer(optionsApp, action),
  currentEvent: eventReducer(currentEvent, action),
  events: eventsListReducer(events, action),
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
