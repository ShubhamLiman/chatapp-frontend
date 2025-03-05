import React from "react";
import { Bolt, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useSelector } from "react-redux";
function Navbar() {
  async function LogoutUser() {
    try {
      console.log("Logging out");

      const responce = await axiosInstance.get("/auth/logout");
      console.log("Logout responce", responce);
    } catch (error) {
      console.log("Error in logout", error);
    }
  }

  const { user } = useSelector((state) => state.authReducer);

  return (
    <div
      className="fixed top-0 w-full flex justify-between items-center bg-slate-200 dark:bg-slate-950 p-6 z-50"
      data-theme="black"
    >
      <div className="flex items-center">
        <span className="dark:text-white text-slate-800 text-xl subpixel-antialiased font-semibold">
          ChatterUp
        </span>
        <span>
          <SendHorizontal
            className="dark:text-white text-slate-800"
            strokeWidth={2.5}
          />
        </span>
      </div>
      <div className="flex items-center gap-8">
        <div>Settings</div>
        {user && (
          <div onClick={LogoutUser} className="cursor-pointer">
            Logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
