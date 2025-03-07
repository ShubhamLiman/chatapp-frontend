import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useDispatch } from "react-redux";
import { authAction } from "../reduxStatemanagement/authReducer";
import { tostAction } from "../reduxStatemanagement/tostReducer";
import { useNavigate } from "react-router-dom";

import FadeIn from "../Components/Fadein";
import AnimatedGraphic from "../Components/AnimatedGraphic";
import LoginForm from "../Components/LoginForm";
function LoginPage() {
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      dispatch(
        tostAction.addToast({
          success: false,
          message: "All fields are required",
        })
      );
      setLoggingIn(false);
      return;
    }

    if (password.length < 6) {
      dispatch(
        tostAction.addToast({
          success: false,
          message: "Password must be at least 6 characters",
        })
      );
      setLoggingIn(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.user.success) {
        dispatch(authAction.setUser(data.user.user));
        dispatch(
          tostAction.addToast({ success: true, message: data.user.message })
        );
      } else {
        dispatch(
          tostAction.addToast({ success: false, message: data.user.message })
        );
        return;
      }
      setLoggingIn(false);
      navigate("/");
    } catch (error) {
      setLoggingIn(false);
      dispatch(
        tostAction.addToast({
          success: false,
          message: error.response.data.user.message,
        })
      );
      console.error("Login failed:", error);
    }
    // try {
    //   const response = await axiosInstance.post("/auth/login", {
    //     email,
    //     password,
    //   });
    //   const data = response.data;
    //   console.log(data);
    // } catch (err) {
    //   console.log(err.response.data.user.message);
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 ">
        <FadeIn duration={300}>
          <LoginForm handleSubmit={handleSubmit} loggingIn={loggingIn} />
        </FadeIn>
      </div>
      <div className="w-1/2">
        <AnimatedGraphic />
      </div>
    </div>
  );
}

export default LoginPage;
