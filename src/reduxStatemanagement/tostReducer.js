import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {};

const toastSlice = createSlice({
  name: "toasts",
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      let a = action.payload;
      if (a.success) {
        toast.success(a.message);
      } else {
        toast.error(a.message);
      }
    },
  },
});

export const tostReducer = toastSlice.reducer;
export const tostAction = toastSlice.actions;
