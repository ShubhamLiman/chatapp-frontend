import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: "black",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    switchTheme: (state, action) => {
      if (state.theme === "black") {
        state.theme = "light";
      } else {
        state.theme = "black";
      }
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeAction = themeSlice.actions;
