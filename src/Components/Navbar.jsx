import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider'; // Correct path to AuthProvider
import logo from '/public/671f38813a68579868b6ea62_Icon Light.svg'
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
    navigate('/');
  };

  return (
 
  <div className="navbar">
  <div className="navbar-start">

    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>


    <img src={logo} className=" bg-black rounded-full w-[50px] text-xl m-6"></img>
  </div>
  <div className="navbar-center hidden lg:flex">

    <ul className="menu menu-horizontal px-1 space-x-10 text-lg font-medium">

    {
            user ? <NavLink
            to="/"
            className={({ isActive }) => 
              isActive 
                ? 'px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl' 
                : 'px-4 py-2 text-sm font-semibold'
            }
          >
           Home
          </NavLink>
            :
            []
          }
          {
            user ? <NavLink
            to="/brands"
            className={({ isActive }) => 
              isActive 
                ? 'px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl' 
                : 'px-4 py-2 text-sm font-semibold'
            }
          >
           Brands
          </NavLink>
            :
            []
          }

          {
            user? <NavLink
            to="/profile"
            className={({ isActive }) => 
              isActive 
                ? 'px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl' 
                : 'px-4 py-2 text-sm font-semibold'
            }
          >
           Profile
          </NavLink>
            :
            []
          }
      
    </ul>

  </div>
  <div className="navbar-end">
  {user ? (
            <>
              <Link to="/profile" className="lg:text-xl font-semibold ml-20 lg:mr-3">Hello, {user.displayName}</Link>

              <div className="dropdown dropdown-end -mt-4">
       
       {
        user ? <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-10">
        <div className="w-10 rounded-full">
        <img
    alt=""
    src={user?.photoURL ? user.photoURL : 'Login'}
    className="hidden lg:block w-10 h-10 rounded-full"
  />
        </div>
      </div>
      :
      []
       }
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {
          user ?
          <div>
            
        <li><a>{user?.email}</a></li>
        <li><button onClick={handleLogout} className="btn"> Log Out</button></li>
          </div>
          :
          <Link to={'/login'} > Login </Link>
        }
      </ul>
    </div>

             
              <button
                onClick={handleLogout}
                className="hover:text-red-500 flex items-center space-x-1 bg-black text-white px-4 py-2 rounded-2xl"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>

            </>
          ) : (
            <div className='space-x-7 mr-10'>
              <NavLink
          to="/login"
          className={({ isActive }) => 
            isActive 
              ? 'px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl' 
              : 'px-4 py-2 text-sm font-semibold'
          }
        >
         Login
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) => 
            isActive 
              ? 'px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl' 
              : 'px-4 py-2 text-sm font-semibold'
          }
        >
         Register
        </NavLink>
            </div>
          )}
  </div>
</div>

  );
};

export default Navbar;
