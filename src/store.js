import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reduxStatemanagement/authReducer";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});
