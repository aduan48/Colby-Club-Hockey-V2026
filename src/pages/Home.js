import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import About from './About'
import Contact from './Contact'
import Header from '../components/Header'

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
    }
  }, [pathname, hash]); // Run this whenever the URL changes

  return (
    <div className = "home">
      
      <Header />
      <About />

      <Contact />
    </div>
  )
}

export default Home
