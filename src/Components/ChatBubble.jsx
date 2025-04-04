import React from "react";
import { useEffect, useRef } from "react";
function ChatBubble({ person, message, connection }) {
  const p = person == "sender" ? "chat-start" : "chat-end";

  function formatMessageTime(tareekh) {
    return new Date(tareekh).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const messageEndRef = useRef(null);
  useEffect(() => {
    if (messageEndRef.current && message) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  return (
    <div className={`chat ${p}`} ref={messageEndRef}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="profile picture" src={connection.profilePic} />
        </div>
      </div>
      <div className="chat-header">
        {connection.fullName}
        <time className="text-xs opacity-50 ml-1">
          {formatMessageTime(message.updatedAt)}
        </time>
      </div>
      <div className="chat-bubble flex flex-col">
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-2"
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
}

export default ChatBubble;
