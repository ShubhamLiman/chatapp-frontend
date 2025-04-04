import React from "react";
import FadeIn from "./Fadein";
import { useNavigate } from "react-router-dom";
function AuthDropdown({ logout }) {
  const nav = useNavigate();
  return (
    <div className="fixed top-24 right-3 w-40 h-46 z-100 cursor-pointer ">
      <FadeIn duration={100}>
        <div className="flex flex-col gap-4  w-full h-full p-2  bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
          <div
            className="w-full h-1/4 flex justify-center"
            onClick={() => {
              nav("/");
            }}
          >
            Home
          </div>
          <div
            className="w-full h-1/4 flex justify-center"
            onClick={() => {
              nav("/profile");
            }}
          >
            Profile Settings
          </div>
          <div className="w-full h-1/4 flex justify-center" onClick={logout}>
            Logout
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default AuthDropdown;
