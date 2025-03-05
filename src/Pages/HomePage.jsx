import React from "react";
import { useSelector } from "react-redux";
function Homepage() {
  const { user } = useSelector((state) => state.authReducer);
  console.log("Homepage");

  console.log(user);

  return <div>Homepage</div>;
}

export default Homepage;
