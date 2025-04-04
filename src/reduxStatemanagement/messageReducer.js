import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  selectedChat: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const messageReducer = messageSlice.reducer;
export const messageAction = messageSlice.actions;
