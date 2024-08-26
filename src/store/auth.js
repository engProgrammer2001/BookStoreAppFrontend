// reducer is used to manage the state of the application and it helps to find the initial state of the application

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: "user",
  },

  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false; // Correctly update the isLoggedIn state
      state.role = "guest"; // Optionally reset the role to guest
    },
    changeRole: (state, action) => {
      const role = action.payload;
      state.role = role;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
