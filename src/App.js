import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useProgress } from '@react-three/drei';
import muleLogo from './assets/frontpuck1.png';

// How long to keep the loading screen up at minimum, so it doesn't just flash
// on screen for a frame when the puck loads instantly (e.g. from cache).
const MIN_LOADING_MS = 800;
// Safety cap: if something goes wrong with the asset load (slow network,
// fetch error) don't leave the user stuck on the loading screen forever.
const MAX_LOADING_MS = 12000;

/**
 *
 * @returns my website
 */
function App() {

  // useProgress reads from three's global LoadingManager, which every
  // useGLTF()/useTexture() call in the app reports to. FloatingPuck.js calls
  // useGLTF.preload() at module scope, so that fetch is already in flight by
  // the time this component mounts, and `progress` reflects its real state
  // instead of a fixed, made-up delay.
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_LOADING_MS);
    const maxTimer = setTimeout(() => setLoading(false), MAX_LOADING_MS);
    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && minTimeElapsed) {
      setLoading(false);
    }
  }, [progress, minTimeElapsed]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-percent">{Math.round(progress)}%</p>
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