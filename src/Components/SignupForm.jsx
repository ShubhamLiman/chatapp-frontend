import React from "react";
import { Link } from "react-router-dom";
import CircularIndeterminate from "./Loadinggif";

export default function SignupForm({ handleSubmit, signingUp }) {
  return (
    <>
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input lg:border-[2px] border-blue-400">
        <form onSubmit={handleSubmit} className=" my-8">
          <h2 className="font-bold text-xl my-6">Create a account</h2>
          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box flex flex-col space-y-4 ">
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              placeholder="John Doe"
              type="text"
              autoComplete="fullname"
              className="input"
            />
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input"
              id="email"
              placeholder="example@email.com"
              autoComplete="email"
            />

            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              id="password"
              autoComplete="current-password"
            />

            <label htmlFor="confirmpassword">Confirm Password </label>
            <input
              id="confirmpassword"
              placeholder="••••••••"
              type="confirmpassword"
              autoComplete="confirm-password"
              className="input"
            />

            <button className="btn btn-neutral mt-4">
              {signingUp ? <CircularIndeterminate /> : "Signup →"}
            </button>
          </fieldset>
          <div className="flex justify-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Alredy have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
