import React from "react";
import { SendHorizontal } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tostAction } from "../reduxStatemanagement/tostReducer";
import { authAction } from "../reduxStatemanagement/authReducer";
import { themeAction } from "../reduxStatemanagement/themeReducer";
import { useState } from "react";
import AuthDropdown from "./AuthDropdown";
import { Sun, Moon } from "lucide-react";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
  const { theme } = useSelector((state) => state.themeReducer);

  const [dropdownvisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownvisible);
  };

  const toggleTheme = () => {
    dispatch(themeAction.switchTheme());
  };

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
    <div className="fixed top-0 w-full lg:h-24 flex justify-between items-center p-6 z-50">
      <div className="flex items-center">
        <span className="text-xl subpixel-antialiased font-semibold">
          ChatterUp
        </span>
        <span>
          <SendHorizontal strokeWidth={2.5} />
        </span>
      </div>
      <div className="h-full flex gap-8 items-center">
        {theme === "black" ? (
          <Sun onClick={toggleTheme} />
        ) : (
          <Moon onClick={toggleTheme} />
        )}

        {user && (
          <div className="h-full">
            <div
              className="flex items-center rounded-full cursor-pointer h-full aspect-square overflow-hidden"
              onClick={toggleDropdown}
            >
              <img src={user.profilePic} alt="profile picture" />
            </div>
          </div>
        )}
      </div>

      {dropdownvisible && user && (
        <AuthDropdown theme={theme} logout={LogoutUser} />
      )}
    </div>
  );
}

export default Navbar;
