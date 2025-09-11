import React, { useState } from "react";
import img from "../assets/img1.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo + Name */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={img}
            className="h-10 w-auto"
            alt="SnapNShop Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SnapNShop
          </span>
        </Link>

        {/* Right Side (Account + Mobile Menu Button) */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          
          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Account
            </button>

            {/* Dropdown menu */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Signup
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Center Nav Links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 
                         rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row 
                         md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 
                         dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
