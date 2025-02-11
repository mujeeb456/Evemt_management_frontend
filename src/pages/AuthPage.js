// src/pages/AuthPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "https://event-management-platform-5xzd.onrender.com/api/auth/login"
      : "https://event-management-platform-5xzd.onrender.com/api/auth/register";
    const payload = { email, password };

    try {
      const response = await axios.post(url, payload);
      localStorage.setItem("token", response.data.token); // Store the token
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post(
        "https://event-management-platform-5xzd.onrender.com/api/auth/guest"
      );
      localStorage.setItem("token", response.data.token); // Store the token
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={handleGuestLogin}
          className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Continue as Guest
        </button>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
