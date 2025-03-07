import React from "react";
import SignupForm from "../Components/SignupForm";
import FadeIn from "../Components/Fadein";
import AnimatedGraphic from "../Components/AnimatedGraphic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tostAction } from "../reduxStatemanagement/tostReducer";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signuping, setSignuping] = useState(false);
  async function Signup(e) {
    e.preventDefault();
    setSignuping(true);
    try {
      const fullname = e.target.fullname.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmpassword = e.target.confirmpassword.value;
      if (!fullname || !email || !password || !confirmpassword) {
        setSignuping(false);
        dispatch(
          tostAction.addToast({
            success: false,
            message: "All fields are required",
          })
        );

        return;
      }
      if (password !== confirmpassword) {
        setSignuping(false);
        dispatch(
          tostAction.addToast({
            success: false,
            message: "Passwords do not match",
          })
        );
        return;
      }
      if (password.length < 6) {
        setSignuping(false);
        dispatch(
          tostAction.addToast({
            success: false,
            message: "Password must be at least 6 characters",
          })
        );
        return;
      }
      const response = await axiosInstance.post("/auth/signup", {
        fullName: fullname,
        email,
        password,
      });
      const data = response.data;
      if (data.success) {
        setSignuping(false);
        dispatch(
          tostAction.addToast({ success: true, message: data.user.message })
        );
        navigate("/login");
      } else {
        setSignuping(false);
        dispatch(
          tostAction.addToast({ success: false, message: data.user.message })
        );
        return;
      }
    } catch (error) {
      setSignuping(false);
      dispatch(
        tostAction.addToast({
          success: false,
          message: error.response.data.user.message,
        })
      );
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 ">
        <FadeIn duration={300}>
          <SignupForm handleSubmit={Signup} signingUp={signuping} />
        </FadeIn>
      </div>
      <div className="w-1/2">
        <AnimatedGraphic />
      </div>
    </div>
  );
}

export default SignupPage;
