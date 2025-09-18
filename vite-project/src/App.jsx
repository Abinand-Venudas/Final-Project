import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar';
import Home from './pages/Home';  // 👈 import your homepage
import Signup from './pages/Signup'; 
import Login from './pages/Login';
import EmailOtpVerification from './pages/email&otpverification';
import ChangePassword from './pages/changepassword';


function App() {
  return (
    <Router>
      {/* Navbar is always visible */}
      <Nav />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home/>} />  {/* Home */}
        <Route path="/signup" element={<Signup />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/emailVerification" element={<EmailOtpVerification/>} />
        <Route path="/changepassword/:email" element={<ChangePassword />} />

      </Routes>
    </Router>
  );
}

export default App;
