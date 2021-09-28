import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
// there should be one slice for players X and O a lot of duplication
export interface StartState {
  value: string;
  score: number;
  status: "set-first-player";
}

const initialState: StartState = {
  value: "",
  score: 0,
  status: "set-first-player",
};

export const addFirstPlayerSlice = createSlice({
  name: "set-first-player",
  initialState,
  reducers: {
    firstPlayer: (state) => {
      state.value = "AI";
    },
    firstPlayerScore: (state) => {
      state.score += 1;
    },
    setNewFirstPlayer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setFirstPlayerScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const {
  firstPlayer,
  setNewFirstPlayer,
  firstPlayerScore,
  setFirstPlayerScore,
} = addFirstPlayerSlice.actions;

export const newFirstPlayer = (state: RootState) => state.firstPlayer.value;
export const newFirstPlayerScore = (state: RootState) =>
  state.firstPlayer.score;

export default addFirstPlayerSlice.reducer;
