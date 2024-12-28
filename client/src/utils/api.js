// src/utils/api.js
import axios from "axios";

const serverURL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_SERVER_URL
  : import.meta.env.VITE_SERVER_URL;

export const authApi = axios.create({
  baseURL: serverURL,
});

export const api = axios.create({
  baseURL: serverURL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(logout())
    return Promise.reject(error)
  }
);

export default api;
