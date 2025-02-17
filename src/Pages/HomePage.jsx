import React from "react";
import { BackgroundLines } from "../Components/ui/background-lines";
import { Link } from "react-router-dom";
import FadeIn from "../Components/Fadein";
function HomePage() {
  return (
    <FadeIn duration={100} className={"w-full"}>
      <BackgroundLines className="flex items-center justify-center w-full h-screen flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Welcome to ChatterUp
        </h2>
        <div className="flex items-center justify-center w-full gap-4 mt-10">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
          </button>
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <Link to="/signup" className="text-white">
                Signup
              </Link>
            </div>
          </button>
        </div>
      </BackgroundLines>
    </FadeIn>
  );
}

export default HomePage;
