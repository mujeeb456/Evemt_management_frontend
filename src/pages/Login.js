import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://event-management-platform-5xzd.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/events");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          No account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
        <p className="mt-2 text-center">
          Or{" "}
          <a href="/guest" className="text-blue-500">
            Login as Guest
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
