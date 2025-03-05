import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reduxStatemanagement/authReducer";
import { tostReducer } from "./reduxStatemanagement/tostReducer";
export const store = configureStore({
  reducer: {
    authReducer,
    tostReducer,
  },
});
