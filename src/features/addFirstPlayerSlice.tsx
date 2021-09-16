import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface StartState {
  value: string;
  score: number;
  status: "add-a-player";
}

const initialState: StartState = {
  value: "",
  score: 0,
  status: "add-a-player",
};

export const addFirstPlayerSlice = createSlice({
  name: "add-a-player",
  initialState,
  reducers: {
    addFirstPlayer: (state) => {
      state.value = "KEN KANEKI";
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
  addFirstPlayer,
  setNewFirstPlayer,
  firstPlayerScore,
  setFirstPlayerScore,
} = addFirstPlayerSlice.actions;

export const newFirstPlayer = (state: RootState) => state.addFirstPlayer.value;
export const newFirstPlayerScore = (state: RootState) =>
  state.addFirstPlayer.score;

export default addFirstPlayerSlice.reducer;
