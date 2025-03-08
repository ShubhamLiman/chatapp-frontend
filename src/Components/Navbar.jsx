import React from "react";
import { SendHorizontal } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tostAction } from "../reduxStatemanagement/tostReducer";
import { authAction } from "../reduxStatemanagement/authReducer";
import { themeAction } from "../reduxStatemanagement/themeReducer";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
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

  return (
    <div className="fixed top-0 w-full flex justify-between items-center p-6 z-50">
      <div className="flex items-center">
        <span className="text-xl subpixel-antialiased font-semibold">
          ChatterUp
        </span>
        <span>
          <SendHorizontal strokeWidth={2.5} />
        </span>
      </div>
      <div className="flex items-center gap-8 text-xl subpixel-antialiased font-semibold">
        <div
          onClick={() => {
            dispatch(themeAction.switchTheme());
            console.log("Theme Switched");
          }}
        >
          Settings
        </div>
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
