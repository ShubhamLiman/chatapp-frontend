import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Homepage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "./lib/axios";
import { authAction } from "./reduxStatemanagement/authReducer";

import CircularIndeterminate from "./Components/Loadinggif";

function App() {
  const { user } = useSelector((state) => state.authReducer);
  const { theme } = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(false);
  async function checkAuth() {
    try {
      setCheckingAuth(true);
      const response = await axiosInstance.get("/auth/check");
      dispatch(authAction.setUser(response.data.user.user));
      setCheckingAuth(false);
    } catch (error) {
      dispatch(authAction.setUser(null));
      setCheckingAuth(false);
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth && !user)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularIndeterminate />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Toaster containerClassName="mt-20" />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
