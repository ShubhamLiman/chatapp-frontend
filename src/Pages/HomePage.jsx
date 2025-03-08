import React from "react";
import { useSelector } from "react-redux";
function Homepage() {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      Homepage
    </div>
  );
}

export default Homepage;
