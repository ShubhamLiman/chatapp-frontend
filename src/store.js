import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reduxStatemanagement/authReducer";
import { tostReducer } from "./reduxStatemanagement/tostReducer";
import { themeReducer } from "./reduxStatemanagement/themeReducer";
export const store = configureStore({
  reducer: {
    authReducer,
    tostReducer,
    themeReducer,
  },
});
