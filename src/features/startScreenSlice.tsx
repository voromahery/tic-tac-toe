import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface StartState {
  status: "start";
  value: boolean;
  displayExtraFeature: boolean
}

const initialState: StartState = {
  status: "start",
  value: false,
  displayExtraFeature: false,
};

export const startSlice = createSlice({
  name: "start",
  initialState,
  reducers: {
    start: (state) => {
      state.value = !state.value;
    },
    displayExtraFeature: (state) => {
      state.value = state.displayExtraFeature;
    },
    startScreen: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    addExtraFeature: (state, action: PayloadAction<boolean>) => {
      state.displayExtraFeature = action.payload;
    },
  },
});

export const { start, startScreen, displayExtraFeature, addExtraFeature } = startSlice.actions;

export const startGame = (state: RootState) => state.start.value;

export const extraFeature = (state: RootState) => state.start.displayExtraFeature;

export default startSlice.reducer;
