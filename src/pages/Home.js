import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://event-management-platform-5xzd.onrender.com/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    const token = localStorage.getItem("token");

    const params = {};
    if (searchQuery) params.name = searchQuery;
    if (searchDate) params.date = searchDate;

    axios
      .get(
        "https://event-management-platform-5xzd.onrender.com/api/events/search",
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        }
      )
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://event-management-platform-5xzd.onrender.com/api/events/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchEvents();
    } catch (error) {
      console.error(
        "Error deleting event:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Events</h1>

        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-blue-500"
            >
              Search
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-xl text-gray-500 mb-4">No upcoming events</p>
            <Link to="/create">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95">
                {" "}
                Create Event
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <div className="flex gap-4">
                  <Link to={`/event/${event._id}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                      View Event
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
