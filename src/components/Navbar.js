import React, { useState } from 'react'
import Logo from '../assets/mule-logo.png';
import {Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/navbar.css'

function Navbar() {

    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? "open" : "close"}> 
        <div className='logoContainer'>
          <img src={Logo} alt="Logo" />
        </div>
          <div className='hiddenLinks'>
            <Link to ="/" onClick={() => scrollToSection('headerContainer')}>  HOME </Link>
          <Link to ="/schedule">  SCHEDULE  </Link>
          <Link to="/#about-section" onClick={() => scrollToSection('about-section')}> ABOUT </Link>
          <Link to ="/contact" onClick={() => scrollToSection('Contact Us')}>  CONTACT  </Link>
          
        </div>
      </div>
      <div className='rightSide'> 
        <Link to ="/" onClick={() => scrollToSection('headerContainer')}>  HOME </Link>
        <Link to ="/schedule">  SCHEDULE </Link>
        <Link to ="/#about-section" onClick={() => scrollToSection('about-section')}>  ABOUT  </Link>
        <Link to ="/contact" onClick={() => scrollToSection('Contact Us')}>  CONTACT  </Link>
        <a href='https://colbyathletics.com/sports/2021/11/17/giving-friends-of-recreation.aspx'>  DONATE </a>
        <button onClick ={toggleNavbar}>
         <ReorderIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar