import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Messages, Message } from "../types/Interface";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const initialState: Messages = { messages: [] };
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMeasage: (state, action) => {
      state.messages = [
        ...state.messages,
        {
          sender: action.payload.sender,
          message: action.payload.message,
          timestamp: action.payload.timestamp,
        },
      ];
    },
    receiveMessage: (state, action) => {
      state.messages = [
        ...state.messages,
        {
          sender: action.payload.sender,
          message: action.payload.message,
          timestamp: action.payload.timestamp,
        },
      ];
    },
  },
});
export const { sendMeasage, receiveMessage } = messageSlice.actions;

const store = configureStore({
  reducer: { messages: messageSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

type RootState = ReturnType<typeof store.getState>;

export default store;
export const messageSelector = (state: RootState) => state.messages.messages;
