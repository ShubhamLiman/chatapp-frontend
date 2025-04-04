import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connections: [],
};

const connectionSlice = createSlice({
  name: "connections",
  initialState: initialState,
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload;
    },
  },
});

export const connectionReducer = connectionSlice.reducer;
export const connectionAction = connectionSlice.actions;
