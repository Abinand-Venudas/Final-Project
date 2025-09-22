import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const { email } = useParams(); // email comes from URL /changePassword/:email
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const decodedEmail = decodeURIComponent(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== changePassword) {
      return alert("❌ Password and Confirm Password must match");
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/changePassword/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, changePassword }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`✅ ${data.message || "Password changed successfully!"}`);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
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
          {/* New Password */}
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

          {/* Confirm Password */}
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

          {/* Submit */}
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
