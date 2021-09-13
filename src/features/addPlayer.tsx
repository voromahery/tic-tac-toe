import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface StartState {
  value: string;
  status: 'add-a-player';
}

const initialState: StartState = {
  value: '',
  status: 'add-a-player',
};

export const addPlayerSlice = createSlice({
  name: 'add-a-player',
  initialState,
  reducers: {
    addPlayer: (state) => {
      state.value = 'KEN KANEKI';
    }, 
    addNewPlayer: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { addPlayer, addNewPlayer} = addPlayerSlice.actions;

export const newPlayer = (state: RootState) => state.addPlayer.value;
export const addSecondPlayer = (state: RootState) => state.addPlayer.value;

export default addPlayerSlice.reducer;
