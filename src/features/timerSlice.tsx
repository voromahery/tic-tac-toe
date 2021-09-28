import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface StartState {
  value: number;
  // status looks not used - remove
  status: "add-timer";
}

const initialState: StartState = {
  value: 3,
  status: "add-timer",
};

export const setTimerSlice = createSlice({
  name: "add-timer",
  initialState,
  reducers: {
    // dont see this action ever user - remove 
    timer: (state) => {
      state.value = 3;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { timer, setTimer } = setTimerSlice.actions;

export const gameTimer = (state: RootState) => state.timer.value;

export default setTimerSlice.reducer;
