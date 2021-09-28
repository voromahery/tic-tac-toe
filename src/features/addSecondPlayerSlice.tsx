import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// file name incorrect 
export interface StartState {
  value: string;
  score: number;
  // status unused ???
  status: "add-second-player";
}

const initialState: StartState = {
  value: "",
  score: 0,
  // status unused ???
  status: "add-second-player",
};

export const secondPlayerSlice = createSlice({
  name: "add-second-player",
  initialState,
  reducers: {
    // unused ???
    secondPlayer: (state) => {
      state.value = "KEN KANEKI";
    },
    // this is an action name should be incrementSecondPlayerScore 
    secondPlayerScore: (state) => {
      state.score += 1;
    },
    setSecondPlayer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setSecondPlayerScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const {
  secondPlayer,
  setSecondPlayer,
  setSecondPlayerScore,
  secondPlayerScore,
} = secondPlayerSlice.actions;

export const newSecondPlayer = (state: RootState) => state.secondPlayer.value;
export const newSecondPlayerScore = (state: RootState) =>
  state.secondPlayer.score;

export default secondPlayerSlice.reducer;
