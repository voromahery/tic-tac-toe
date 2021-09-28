import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface nextState {
  value: boolean;
  // status unused ???
  status: "next-player";
}

const initialState: nextState = {
  value: false,
  // status unused ???
  status: "next-player",
};

export const nextPlayerSlice = createSlice({
  name: "next-player",
  initialState,
  reducers: {
    // action name is not sorrect should be switchToNext or something
    isNext: (state) => {
      state.value = !state.value;
    },
    setNextPlayer: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { isNext, setNextPlayer } = nextPlayerSlice.actions;

export const next = (state: RootState) => state.isNext.value;

export default nextPlayerSlice.reducer;
