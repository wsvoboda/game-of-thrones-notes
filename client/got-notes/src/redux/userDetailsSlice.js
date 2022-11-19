import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  firstName: '',
  lastName: '',
  email: '',
};

export const userDetailsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
    }
  },
});

export const { loginUser, logoutUser } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
