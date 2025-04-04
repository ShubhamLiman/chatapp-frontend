import { io } from "socket.io-client";
import { store } from "../store.js";
import { authAction } from "../reduxStatemanagement/authReducer.js";
import { messageAction } from "../reduxStatemanagement/messageReducer.js";
let userSocket = null;

export const connectToSocketIO = (url) => {
  const { user } = store.getState().authReducer;

  if (userSocket?.connected || user === null) {
    console.log("connection fail");
    return;
  }
  const socket = io(url, {
    query: {
      userId: user._id,
    },
  });
  socket.connect();
  userSocket = socket;
  socket.on("getOnlineUsers", (userIds) => {
    store.dispatch(authAction.setOnlineUsers(userIds));
  });

  console.log("connection success");
};

export const disconnectFromSocketIO = () => {
  if (userSocket?.connected) {
    userSocket.disconnect();
    userSocket = null;
  }
};

export const subscribeToMessages = () => {
  // const { messages, selectedChat } = store.getState().messageReducer;
  // if (selectedChat) {
  //   userSocket.on("newMessage", (message) => {
  //     if (message.senderID === selectedChat._id) {
  //       console.log(messages);
  //       console.log(selectedChat);

  //       store.dispatch(messageAction.setMessages([...messages, message]));
  //     }
  //   });
  // }

  if (store.getState().messageReducer.selectedChat) {
    userSocket.on("newMessage", (message) => {
      const { messages, selectedChat } = store.getState().messageReducer;
      if (message.senderID === selectedChat._id) {
        store.dispatch(messageAction.setMessages([...messages, message]));
      }
    });
  }
};

export const unsubscribeFromMessages = () => {
  if (userSocket) {
    userSocket.off("newMessage");
  }
};
