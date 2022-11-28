import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResult: {},
  saved: []
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    searchCharacters: (state, action) => {
      state.searchResult = action.payload;
    },
    saveCharacter: (state, action) => {
      state.saved = [...state.saved, action.payload];
    }
  },
});

export const { searchCharacters, saveCharacter } = characterSlice.actions;

export default characterSlice.reducer;
