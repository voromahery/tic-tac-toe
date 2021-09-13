import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import startReducer from '../features/startScreenSlice'
import addPlayerReducer from '../features/addPlayer'
import secondPlayerReducer from '../features/addSecondPlayer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    start: startReducer,
    addPlayer: addPlayerReducer,
    secondPlayer: secondPlayerReducer
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
