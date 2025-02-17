import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  user: {},
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log("setting login");

      if (!state.user) {
        state.isLoggedin = false;
      } else {
        state.isLoggedin = true;
      }
    },

    setUser: (state, action) => {
      console.log("setting user");

      state.user = action.payload;
    },

    // checkAuth:(state,action)=>{

    // }
  },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.action;
