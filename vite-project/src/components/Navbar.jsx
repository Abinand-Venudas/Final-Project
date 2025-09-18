import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SnapNShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/products" className="hover:text-blue-500">Products</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Account
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg">
                <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {menuOpen ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-gray-100">Products</Link>
          <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-100">About</Link>

          {/* Account Dropdown */}
          <div className="border-t">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Account
            </button>
            {dropdownOpen && (
              <div className="bg-white border-t">
                <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">
                  Signup
                </Link>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
