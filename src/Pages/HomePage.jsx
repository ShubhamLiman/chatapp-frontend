import React from "react";
import { useSelector } from "react-redux";
function Homepage() {
  const { user } = useSelector((state) => state.authReducer);

  return <div>Homepage</div>;
}

export default Homepage;
