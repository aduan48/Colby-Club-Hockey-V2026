import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import muleLogo from './assets/frontpuck1.png';
import puckWebm from './assets/puck.webm';

const MIN_LOADING_MS = 800;   // don't flash the loader for a split second
const MAX_LOADING_MS = 8000;  // never trap someone on a slow connection

function App() {
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Download the hero video and report real progress.
  // The browser caches it, so <Hero>'s <video> plays instantly afterwards.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(puckWebm);
        const total = Number(res.headers.get('Content-Length')) || 0;

        if (!res.body || !total) {
          await res.blob();               // can't measure, just wait for it
        } else {
          const reader = res.body.getReader();
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            received += value.length;
            if (!cancelled) setProgress((received / total) * 100);
          }
        }
      } catch (e) {
        // network error: don't block the site
      }
      if (!cancelled) {
        setProgress(100);
        setVideoReady(true);
      }
    })();

    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_LOADING_MS);
    const maxTimer = setTimeout(() => setLoading(false), MAX_LOADING_MS);

    return () => {
      cancelled = true;
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (videoReady && minTimeElapsed) setLoading(false);
  }, [videoReady, minTimeElapsed]);

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