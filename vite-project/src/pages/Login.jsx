import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    setMessage(""); 
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.data);


        alert("✅ Login successful!");

        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(res.data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          {message && (
            <p className="text-center mt-3 text-sm text-red-500">{message}</p>
          )}

          <div className="text-center mt-3">
            <Link
              to="/EmailVerification"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-blue-600 hover:underline">
              Create
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
