import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface StartState {
  value: string;
  status: 'add-second-player';
}

const initialState: StartState = {
  value: '',
  status: 'add-second-player',
};

export const secondPlayerSlice = createSlice({
  name: 'add-second-player',
  initialState,
  reducers: {
    secondPlayer: (state) => {
      state.value = 'KEN KANEKI';
    }, 
    addSecondPlayer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { secondPlayer, addSecondPlayer} = secondPlayerSlice.actions;

export const newSecondPlayer = (state: RootState) => state.secondPlayer.value;

export default secondPlayerSlice.reducer;
