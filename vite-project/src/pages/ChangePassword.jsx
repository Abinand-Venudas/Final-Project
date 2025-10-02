import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      alert("⚠️ Invalid request. Email not found.");
      navigate("/login");
      return;
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== changePassword) {
      return alert("❌ Password and Confirm Password must match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/changePassword`,
        { password, changePassword },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data; 
      if (data.success) {
        alert(`✅ ${data.message || "Password changed successfully!"}`);

        localStorage.removeItem("token");

        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={changePassword}
              onChange={(e) => setChangePassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
