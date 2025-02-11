import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuestLogin from "./pages/GuestLogin";

function Layout() {
  const location = useLocation();

  const authRoutes = ["/", "/signup", "/guest"];

  return (
    <>
      {!authRoutes.includes(location.pathname) && <Navbar />}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/guest" element={<GuestLogin />} />
          <Route path="/events" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
