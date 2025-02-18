import React from "react";
import LoginForm from "../Components/LoginForm";
import FadeIn from "../Components/Fadein";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function LoginPage() {
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);
  // console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Email and Password are required", {
        duration: 4000,
        position: "top-center",
      });
      setLoggingIn(false);
      return;
    }
    if (password.length < 6) {
      toast.error("invalid", {
        duration: 4000,
        position: "top-center",
      });
      setLoggingIn(false);
      return;
    }
    try {
      const response = await fetch(
        "https://chatapp-backend-pi-fawn.vercel.app/api/auth/login",
        // "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.user.success) {
        setCookie("jwt", data.token, 1);
        toast.success(data.user.message, {
          duration: 4000,
          position: "top-center",
        });

        setLoggingIn(false);
      } else {
        toast.error(data.user.message, {
          duration: 4000,
          position: "top-center",
        });
        setLoggingIn(false);
      }
    } catch (error) {
      toast.error("An error occurred", {
        duration: 4000,
        position: "top-center",
      });
      setLoggingIn(false);
    }
  };
  return (
    <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Toaster containerClassName="mt-20" />
      <FadeIn duration={100} className={"w-full"}>
        <LoginForm handleSubmit={handleSubmit} loggingIn={loggingIn} />
      </FadeIn>
    </div>
  );
}

export default LoginPage;
