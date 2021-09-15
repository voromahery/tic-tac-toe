import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface StartState {
  value: string;
  score: number;
  status: "add-second-player";
}

const initialState: StartState = {
  value: "",
  score: 0,
  status: "add-second-player",
};

export const secondPlayerSlice = createSlice({
  name: "add-second-player",
  initialState,
  reducers: {
    secondPlayer: (state) => {
      state.value = "KEN KANEKI";
    },
    secondPlayerScore: (state) => {
      state.score += 1;
    },
    addSecondPlayer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    addSecondPlayerScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const {
  secondPlayer,
  addSecondPlayer,
  addSecondPlayerScore,
  secondPlayerScore,
} = secondPlayerSlice.actions;

export const newSecondPlayer = (state: RootState) => state.secondPlayer.value;
export const newSecondPlayerScore = (state: RootState) =>
  state.secondPlayer.score;

export default secondPlayerSlice.reducer;
