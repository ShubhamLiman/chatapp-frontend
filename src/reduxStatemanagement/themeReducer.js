import { createSlice } from "@reduxjs/toolkit";
const storedTheme = localStorage.getItem("theme");
const initialState = {
  theme: storedTheme ? storedTheme : "black",
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
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeAction = themeSlice.actions;
