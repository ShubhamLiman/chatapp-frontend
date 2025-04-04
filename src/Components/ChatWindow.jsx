import React from "react";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../lib/axios";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { messageAction } from "../reduxStatemanagement/messageReducer";
import { subscribeToMessages, unsubscribeFromMessages } from "../lib/socket";
function ChatWindow({ connection }) {
  const { user } = useSelector((state) => state.authReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();

  const [loadMessages, setLoadMessages] = useState(false);

  async function getMessages(conn) {
    setLoadMessages(true);
    try {
      const res = await axiosInstance.get(`/message/get/${conn._id}`);

      if (res.data.success) {
        dispatch(messageAction.setMessages([...res.data.messages]));
        setLoadMessages(false);
      }

      setLoadMessages(false);
    } catch (e) {
      console.log(e);
      setConnectionLoad(false);
    }
  }

  useEffect(() => {
    getMessages(connection);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [connection._id, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center w-full h-[10%] text-2xl font-semibold">
        {connection.fullName}
      </div>
      <div className="flex-grow overflow-y-auto p-8 flex flex-col g-2">
        <div className="mt-auto">
          {messages.map((message, index) => {
            return (
              <ChatBubble
                key={index}
                person={message.senderID == user._id ? "receiver" : "sender"}
                message={message}
                connection={message.senderID == user._id ? user : connection}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full h-[15%] flex items-center justify-center gap-2">
        <MessageInput connection={connection} />
      </div>
    </div>
  );
}

export default ChatWindow;
