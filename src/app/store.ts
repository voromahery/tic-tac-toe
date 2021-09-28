import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import startReducer from "../features/startScreenSlice";
import addFirstPlayerReducer from "../features/addFirstPlayerSlice";
import secondPlayerReducer from "../features/addSecondPlayerSlice";
import timerReducer from "../features/timerSlice";
import nextPlayerReducer from "../features/nextPlayerSlice";

export const store = configureStore({
  reducer: {
    start: startReducer,
    // there should be one slice for players X and O a lot of duplication
    firstPlayer: addFirstPlayerReducer,
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
