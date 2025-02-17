import React from "react";
import SignupForm from "../Components/SignupForm";
import FadeIn from "../Components/Fadein";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
function SignupPage() {
  const [signingUp, setsigningUp] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setsigningUp(true);
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmpassword.value;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 4000,
        position: "top-center",
      });
      setsigningUp(false);
      return;
    }

    try {
      const response = await fetch(
        "https://chatapp-backend-pi-fawn.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message, {
          duration: 4000,
          position: "top-center",
        });

        setsigningUp(false);
      } else {
        toast.error(data.message, {
          duration: 4000,
          position: "top-center",
        });
        setsigningUp(false);
      }
    } catch (error) {
      toast.error("An error occurred", {
        duration: 4000,
        position: "top-center",
      });
      setsigningUp(false);
    }
  };
  return (
    <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Toaster containerClassName="mt-20" />
      <FadeIn duration={100} className={"w-full"}>
        <SignupForm handleSubmit={handleSubmit} signingUp={signingUp} />
      </FadeIn>
    </div>
  );
}

export default SignupPage;
