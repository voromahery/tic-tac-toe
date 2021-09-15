import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface StartState {
  value: boolean;
  status: "start";
}

const initialState: StartState = {
  value: false,
  status: "start",
};

export const startSlice = createSlice({
  name: "start",
  initialState,
  reducers: {
    start: (state) => {
      state.value = !state.value;
    },
    startScreen: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { start, startScreen } = startSlice.actions;

export const startGame = (state: RootState) => state.start.value;

export default startSlice.reducer;
