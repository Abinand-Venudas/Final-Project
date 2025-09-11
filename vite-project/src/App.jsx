import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar';
import HomePage from './pages/Home';  // 👈 import your homepage


function App() {
  return (
    <Router>
      {/* Navbar is always visible */}
      <Nav />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />   {/* Home */}
      </Routes>
    </Router>
  );
}

export default App;
