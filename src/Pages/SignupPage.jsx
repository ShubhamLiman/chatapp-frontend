import React from "react";
import SignupForm from "../Components/SignupForm";
import FadeIn from "../Components/Fadein";
import AnimatedGraphic from "../Components/AnimatedGraphic";
function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 ">
        <FadeIn duration={300}>
          <SignupForm />
        </FadeIn>
      </div>
      <div className="w-1/2">
        <AnimatedGraphic />
      </div>
    </div>
  );
}

export default SignupPage;
