import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-production-196a.up.railway.app/api",
  // baseURL: "http://localhost:3000/api",
  // baseURL: "https://chatapp-backend-sigma.vercel.app/api",
  withCredentials: true,
});
