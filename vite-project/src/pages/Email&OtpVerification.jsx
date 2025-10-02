import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailOtpVerification = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 1) {
      setOtp("");
    }
  }, [step]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/emailVerification", {
        email,
      });

      if (res.data.success) {
        alert(`✅ ${res.data.message}`);
        setStep(2);
      } else {
        alert(`❌ ${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/otpVerification", {
        email,
        code: otp,
      });

      if (res.data.success) {
        alert(`✅ ${res.data.message}`);
        setTimeout(
          () => navigate(`/changepassword/${encodeURIComponent(email)}`),
          1500
        );
      } else {
        alert(`❌ ${res.data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {step === 1 ? "Email Verification" : "OTP Verification"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-3 border rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">OTP</label>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded-xl tracking-widest text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="mt-4 text-sm text-blue-600 hover:underline block mx-auto"
          >
            ← Change Email
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailOtpVerification;
