// src/axiosInstance.js
import axios from "axios";

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://event-management-platform-5xzd.onrender.com/api", // Your backend API base URL
});

// Add an interceptor to include the JWT token in every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
  }
  return config;
});

export default axiosInstance; // Export the custom axios instance
