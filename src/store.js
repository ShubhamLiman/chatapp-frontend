import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reduxStatemanagement/authReducer";
import { tostReducer } from "./reduxStatemanagement/tostReducer";
import { themeReducer } from "./reduxStatemanagement/themeReducer";
import { connectionReducer } from "./reduxStatemanagement/connectionsReducer";
import { messageReducer } from "./reduxStatemanagement/messageReducer";
export const store = configureStore({
  reducer: {
    authReducer,
    tostReducer,
    themeReducer,
    connectionReducer,
    messageReducer,
  },
});
