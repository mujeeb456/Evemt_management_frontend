import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuestLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://event-management-platform-5xzd.onrender.com/api/auth/guest"
      );
      localStorage.setItem("token", response.data.token);
      navigate("/events");
    } catch (error) {
      console.error("Guest login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative container mx-auto p-6 max-w-md bg-white shadow-md rounded-lg text-center">
      {loading && (
        <div className="absolute top-0 left-0 w-full bg-purple-600 text-white p-2 rounded-t-lg">
          Loading...
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Guest Login</h1>
      <p className="mb-4 text-gray-600">
        You're logging in as a guest. Some features may be limited.
      </p>
      <button
        onClick={handleGuestLogin}
        disabled={loading}
        className={`w-full p-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 text-white"
        }`}
      >
        {loading ? "Logging in..." : "Continue as Guest"}
      </button>
    </div>
  );
};

export default GuestLogin;
