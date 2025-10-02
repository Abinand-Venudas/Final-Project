import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");   
  const navigate = useNavigate();

  useState(() => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await axios.post("http://localhost:5000/signUp", {
        name,
        email,
        password,
      });

      const data = res.data; 

      if (data.success) {
        
        localStorage.setItem("token", data.data);

        window.dispatchEvent(new Event("authChange"));

        setMessage("✅ Account created successfully!");

        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };
});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        {message && (
          <p className="text-center mt-3 text-sm text-red-500">{message}</p>
        )}
        
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;