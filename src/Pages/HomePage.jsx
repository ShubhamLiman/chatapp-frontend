import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { MessageCircle, Handshake, Users, Bell } from "lucide-react";
import UserConnections from "../Components/UserConnections";
import { axiosInstance } from "../lib/axios";
import { connectionAction } from "../reduxStatemanagement/connectionsReducer";
import CircularIndeterminate from "../Components/Loadinggif";
import ChatWindow from "../Components/ChatWindow";
import { messageAction } from "../reduxStatemanagement/messageReducer";

function Homepage() {
  const { connections } = useSelector((state) => state.connectionReducer);
  const { theme } = useSelector((state) => state.themeReducer);
  const { selectedChat } = useSelector((state) => state.messageReducer);

  const bgColor = theme === "black" ? "bg-white/10" : "bg-black/10";
  const dispatch = useDispatch();

  const [connectionsLoad, setConnectionLoad] = useState(false);
  // const [selectedChat, setSelectedChat] = useState(null);

  const containerStyle = {
    height: `calc(100vh - 100px)`,
    marginTop: `calc(90px)`,
  };

  function handleSelectChat(connection) {
    dispatch(messageAction.setSelectedChat(connection));
  }

  async function getConnections() {
    setConnectionLoad(true);
    try {
      const res = await axiosInstance.get("/auth/getconnections");

      if (res.data.success) {
        dispatch(connectionAction.setConnections(res.data.connections.users));
        setConnectionLoad(false);
      }

      setConnectionLoad(false);
    } catch (e) {
      console.log(e);
      setConnectionLoad(false);
    }
  }
  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="flex w-full h-screen gap-1 p-2">
      <div
        className={`flex flex-col items-center gap-8 w-[5%] ${bgColor} backdrop-blur-lg rounded-l-xl shadow-lg`}
        style={containerStyle}
      >
        <div className="tooltip mt-10" data-tip="Messages">
          <MessageCircle size={30} strokeWidth={1} />
        </div>
        <div className="tooltip mt-10" data-tip="Teams">
          <Handshake size={30} strokeWidth={1} />
        </div>
        <div className="tooltip mt-10" data-tip="Groups">
          <Users size={30} strokeWidth={1} />
        </div>
        <div className="tooltip mt-10" data-tip="Notifications">
          <Bell size={30} strokeWidth={1} />
        </div>
      </div>
      <div
        className={`flex flex-col items-center gap-8 w-[25%] ${bgColor} backdrop-blur-lg shadow-lg`}
        style={containerStyle}
      >
        {connectionsLoad ? (
          <div className="h-full w-full flex justify-center items-center">
            <CircularIndeterminate />{" "}
          </div> // Render CircularIndeterminate when connectionsLoad is true
        ) : connections.length === 0 ? (
          <div>No Connections</div>
        ) : (
          <div className="h-full w-full flex flex-col p-2">
            {connections.map((connection, index) => {
              return (
                <UserConnections
                  connection={connection}
                  selectedChat={selectedChat}
                  key={index}
                  handleSelectChat={handleSelectChat}
                />
              );
            })}
          </div>
        )}
      </div>
      <div
        className={`w-[70%] h-full ${bgColor} backdrop-blur-lg rounded-r-xl shadow-lg`}
        style={containerStyle}
      >
        {selectedChat ? (
          <ChatWindow connection={selectedChat} />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            Welcome to chatterup!!
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
