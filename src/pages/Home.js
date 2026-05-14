import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import About from './About'
import Contact from './Contact'
import Header from '../components/Header'
import Schedule from './Schedule'
import Roster from './Roster'
import Puck from '../components/FloatingPuck'
import { Canvas, useFrame } from '@react-three/fiber'
import Carousel from '../components/PhotoCarousel'

import '../styles/Home.css'



function Home() {


  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL is /about OR if there is a hash like #about-section
    if (pathname === '/about' || hash === '#about-section') {
      const element = document.getElementById('about-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if(pathname === '/contact'){
      const element = document.getElementById('Contact Us');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if(pathname === '/home'){
      const element = document.getElementById('puck-title');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]); // Run this whenever the URL changes

  return (
<div className="home">
    <Puck />
    
    {/* Wrap About in a white section */}
    <div className="white-section" id="about-section">
      <About />
    </div>

    <Roster />

    {/* Wrap Contact in a white section */}
    <div className="white-section" id="contact-us">
      <Contact />
    </div>
  </div>
  )
}

export default Home
