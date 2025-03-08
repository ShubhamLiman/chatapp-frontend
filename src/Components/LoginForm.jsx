import React from "react";
import { Link } from "react-router-dom";
import CircularIndeterminate from "./Loadinggif";
export default function LoginForm({ handleSubmit, loggingIn }) {
  return (
    <>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input lg:border-[2px] border-blue-400">
        <form onSubmit={handleSubmit} className=" my-8">
          <h2 className="font-bold text-xl my-6">Login to your account</h2>
          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box flex flex-col space-y-4 ">
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

            <button className="btn btn-neutral mt-4">
              {loggingIn ? <CircularIndeterminate /> : "Login →"}
            </button>
          </fieldset>
          <div className="flex justify-center mt-4">
            <Link to="/signup" className="text-blue-500 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
