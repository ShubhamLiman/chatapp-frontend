import React from "react";
import { Bolt, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  async function LogoutUser() {
    try {
      const responce = await axiosInstance.get("/auth/logout");
    } catch (error) {
      console.log("Error in logout", error);
    }
  }

  const { user } = useSelector((state) => state.authReducer);
  const [isRotating, setIsRotating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleBoltClick = () => {
    setIsRotating(!isRotating);
    setIsDropdownOpen(!isDropdownOpen);
  };

  let dropdownItems = [];

  if (user) {
    dropdownItems = ["Settings", "switch mode", "Logout"];
  } else {
    dropdownItems = ["switch mode"];
  }

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

      <div className="relative">
        <button
          className="btn btn-ghost rounded-btn m-1"
          onClick={handleBoltClick}
        >
          <Bolt
            className={`dark:text-white text-slate-800 ${
              isRotating ? "rotate-to-45" : "rotate-to-0"
            }`}
            strokeWidth={2.5}
          />
        </button>
        <ul
          className={`absolute right-0 mt-2 w-52 bg-slate-800 rounded-box shadow-lg transition-all duration-300 ease-in-out transform ${
            isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ pointerEvents: isDropdownOpen ? "auto" : "none" }}
        >
          {dropdownItems.map((item, i) => {
            return (
              <li key={i} className="p-2 hover:bg-slate-700">
                {item === "Logout" ? (
                  <Link to="#" onClick={LogoutUser}>
                    {item}
                  </Link>
                ) : (
                  <Link to="#">{item}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
