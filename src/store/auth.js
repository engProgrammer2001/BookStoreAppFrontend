// reducer is use to manage the state of the application and it's help me to find initial state of the application

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: "user",
    // username: "",
  },

  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
    // userName(state, action) {
    //   const username = action.payload;
    //   state.username = username;
    // },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
