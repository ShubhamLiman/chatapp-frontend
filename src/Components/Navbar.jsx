import React from "react";
import { Bolt, SendHorizontal } from "lucide-react";
import { useState } from "react";
import FadeIn from "./Fadein";
function Navbar() {
  const [isRotating, setIsRotating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleBoltClick = () => {
    setIsRotating(!isRotating);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="fixed top-0 w-full flex justify-between items-center bg-slate-200 dark:bg-slate-950 p-6 z-50">
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
      {/* <div onClick={handleBoltClick} className="cursor-pointer">
        <Bolt
          className={`dark:text-white text-slate-800 ${
            isRotating ? "rotate-to-45" : "rotate-to-0"
          }`}
          strokeWidth={2.5}
        />
      </div> */}

      <details className="dropdown  dropdown-end" open={isDropdownOpen}>
        <summary
          className="btn btn-ghost rounded-btn m-1"
          onClick={handleDropdownToggle}
        >
          <div onClick={handleBoltClick} className="cursor-pointer">
            <Bolt
              className={`dark:text-white text-slate-800 ${
                isRotating ? "rotate-to-45" : "rotate-to-0"
              }`}
              strokeWidth={2.5}
            />
          </div>
        </summary>
        <ul
          tabIndex={0}
          className={`menu dropdown-content bg-slate-800 rounded-box z-[1] mt-4 w-52 p-2 shadow transition-opacity duration-200 ${
            isDropdownOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
    </div>
  );
}

export default Navbar;
