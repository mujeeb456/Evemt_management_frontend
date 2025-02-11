import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuestLogin = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post(
        "https://event-management-platform-5xzd.onrender.com/api/auth/guest"
      );
      localStorage.setItem("token", response.data.token);
      navigate("/events");
    } catch (error) {
      console.error("Guest login failed", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-white shadow-md rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Guest Login</h1>
      <p className="mb-4 text-gray-600">
        You're logging in as a guest. Some features may be limited.
      </p>
      <button
        onClick={handleGuestLogin}
        className="w-full bg-purple-600 text-white p-2 rounded"
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default GuestLogin;
