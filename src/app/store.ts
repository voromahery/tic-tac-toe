import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import startReducer from "../features/startScreenSlice";
import addFirstPlayerReducer from "../features/addFirstPlayerSlice";
import secondPlayerReducer from "../features/addSecondPlayerSlice";
import timerReducer from "../features/timerSlice";
import nextPlayerReducer from "../features/nextPlayerSlice";

export const store = configureStore({
  reducer: {
    start: startReducer,
    addFirstPlayer: addFirstPlayerReducer,
    secondPlayer: secondPlayerReducer,
    timer: timerReducer,
    isNext: nextPlayerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
