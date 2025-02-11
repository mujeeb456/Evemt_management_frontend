import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#1f1c2c] to-[#535353] p-5 text-white shadow-lg backdrop-blur-lg bg-opacity-70 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Name */}
        <Link to="/events" className="flex items-center">
          <span className="text-3xl font-bold font-satisfy bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
            Event Manager
          </span>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-6">
          <Link
            to="/events"
            className={`px-5 py-2 rounded-2xl text-base font-medium transition-all duration-300 ease-in-out ${
              location.pathname === "/events"
                ? "bg-yellow-400 text-black shadow-md shadow-yellow-500"
                : "hover:text-yellow-300 hover:scale-105"
            }`}
          >
            Home
          </Link>

          <Link
            to="/create"
            className={`px-5 py-2 rounded-2xl text-base font-medium transition-all duration-300 ease-in-out ${
              location.pathname === "/create"
                ? "bg-yellow-400 text-black shadow-md shadow-yellow-500"
                : "hover:text-yellow-300 hover:scale-105"
            }`}
          >
            Create Event
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-2xl text-base font-medium bg-red-500 hover:bg-red-600 shadow-md shadow-red-700 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
