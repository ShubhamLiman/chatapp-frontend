import React from "react";
import { useSelector } from "react-redux";

function UserConnections({ connection, handleSelectChat, selectedChat }) {
  const { theme } = useSelector((state) => state.themeReducer);
  const { onlineUsers } = useSelector((state) => state.authReducer);

  const bgColor =
    theme === "black"
      ? "bg-base-300 ring-1 ring-base-300 rounded-full"
      : "bg-black/10 transition-colors rounded-full";
  const hoverBg =
    theme === "black"
      ? "hover:bg-base-300 transition-colors rounded-full"
      : "hover:bg-black/10 transition-colors rounded-full";

  return (
    <button
      key={connection._id}
      onClick={() => handleSelectChat(connection)}
      className={`
              w-full p-3 flex items-center gap-3 my-2
              ${hoverBg}
              ${selectedChat?._id === connection._id ? `${bgColor}` : ""}
            `}
    >
      <div className="relative mx-auto lg:mx-0">
        <img
          src={connection.profilePic || "/avatar.png"}
          alt={connection.fullName}
          className="size-12 object-cover rounded-full"
        />

        {onlineUsers.includes(connection._id) && (
          <span
            className="absolute bottom-0 right-0 size-3 bg-green-500
                  rounded-full ring-2 ring-zinc-900"
          />
        )}
      </div>

      {/* User info - only visible on larger screens */}
      <div className="hidden lg:block text-left min-w-0">
        <div className="font-medium truncate">{connection.fullName}</div>
        <div className="text-sm text-zinc-400">
          {onlineUsers.includes(connection._id) ? "Online" : "Offline"}
        </div>
      </div>
    </button>
  );
}

export default UserConnections;
