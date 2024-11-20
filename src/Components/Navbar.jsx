import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider'; // Correct path to AuthProvider

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Destructure from AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // To get the current path
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/brands?search=${searchQuery}`); // Navigate to brands search page
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="bg-red-400 mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">Discount PRO</Link>
        </div>

        {/* Search Bar (only on /brands page) */}
        {location.pathname === '/brands' && (
          <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search Brands..."
              className="px-4 py-2 w-64 bg-gray-800 text-white focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              <FaSearch />
            </button>
          </form>
        )}

        {/* Links for Navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          {
            user ? <Link to="/brands" className="hover:text-blue-500">Brands</Link>
            :
            []
          }

          {/* Conditional rendering based on user authentication */}
          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-500">Hello, {user.displayName}</Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 flex items-center space-x-1"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <Link to="/register" className="hover:text-blue-500">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
