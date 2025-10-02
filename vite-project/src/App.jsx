import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup'; 
import Login from './pages/Login';
import Product from './pages/Product';
import EmailOtpVerification from './pages/Email&OtpVerification';
import ChangePassword from './pages/ChangePassword';



function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/signup" element={<Signup />} />  
        <Route path="/login" element={<Login/>} />
        <Route path="/emailVerification" element={<EmailOtpVerification/>} />
        <Route path="/changepassword/:email" element={<ChangePassword />} />
        <Route path="/products" element={<Product/>} />
      </Routes>
    </Router>
  );
}

export default App;
