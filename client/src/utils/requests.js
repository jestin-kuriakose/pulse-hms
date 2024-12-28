import axios from "axios";
import serverURL from "./url";

export const userRequest = axios.create({
  baseURL: serverURL,
});

// Add a request interceptor to dynamically set the Authorization header
userRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `${token}`; // Set token in Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
