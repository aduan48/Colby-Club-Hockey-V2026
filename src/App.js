import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Define the timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // 2. Optional: If you want to ensure it ONLY disappears 
    // after BOTH the timer is done AND the window is loaded:
    const handleLoad = () => {
      // You could add logic here if you wanted to wait for heavy assets
    };

    if (document.readyState === 'complete') {
      // Page is already ready, the timeout above will handle the exit
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 3. Cleanup (Very important to prevent memory leaks)
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);


  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h1>Colby Club Hockey</h1>
      </div>
    );
  }

  return (
    <div className="App"> 
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/home" element={<Home />} />
          <Route path = "/contact" element={<Home />} />
          <Route path = "/about" element ={<Home />} />
          <Route path = "/schedule" element = {<Schedule />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
