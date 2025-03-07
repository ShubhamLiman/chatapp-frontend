import React from "react";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tostAction } from "../reduxStatemanagement/tostReducer";
import { authAction } from "../reduxStatemanagement/authReducer";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function LogoutUser(e) {
    e.preventDefault();
    try {
      const responce = await axiosInstance.get("/auth/logout");
      const data = responce.data;
      if (data.success) {
        dispatch(authAction.setUser(null));
        navigate("/login");
        dispatch(tostAction.addToast({ success: true, message: data.message }));
      } else {
        dispatch(
          tostAction.addToast({ success: false, message: data.message })
        );
        return;
      }
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
