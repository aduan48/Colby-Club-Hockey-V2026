import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import muleLogo from './assets/frontpuck1.png';

/**
 * 
 * @returns my website
 */
function App() {
  
  const [loading, setLoading] = useState(true);//when first loading I want it to show teh loading screen

  /**
   * Sets and makes the loading screen when first launches
   */
  useEffect(() => {
    // Keep the loading screen active for 2.5 seconds for animation purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <img src={muleLogo} className="mule-pulse-logo" alt="mule logo" />
      </div>
    );
  }

  return (
    <div className="App"> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;