import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface StartState {
  value: number;
  status: 'add-timer';
}

const initialState: StartState = {
  value: 3,
  status: 'add-timer',
};

export const addTimerSlice = createSlice({
  name: 'add-timer',
  initialState,
  reducers: {
    timer: (state) => {
      state.value = 3
    }, 
    addTimer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { timer, addTimer} = addTimerSlice.actions;

export const gameTimer = (state: RootState) => state.timer.value;

export default addTimerSlice.reducer;
