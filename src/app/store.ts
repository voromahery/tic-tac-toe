import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import startReducer from "../features/startScreenSlice";
import addFirstPlayerReducer from "../features/addFirstPlayer";
import secondPlayerReducer from "../features/addSecondPlayer";
import timerReducer from "../features/timer";
import nextPlayerReducer from "../features/nextPlayer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
