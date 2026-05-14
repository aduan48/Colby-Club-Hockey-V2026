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
    // This waits for the window "load" event (all images, scripts, etc. are ready)
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
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
