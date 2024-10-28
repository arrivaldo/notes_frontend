import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center z-30 relative">
      <div className="text-xl font-bold">
        <Link to="/">Notes.io</Link>
      </div>
      {/* <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded"
        onChange={(e) => setQuery(e.target.value)}
      /> */}
      <div>
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded mr-4 ">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user.name}</span>
            <button
              onClick={handleLogout} // Update the onClick handler
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
