import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  onlineUsers: [],
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
