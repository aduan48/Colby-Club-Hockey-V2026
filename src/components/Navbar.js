import React, { useState } from 'react'
import Logo from '../assets/mule-logo.png';
import {Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/navbar.css'

/**
 * 
 * @returns The Navbar hat is fixed on the top of the web
 */
function Navbar() {

    //starts of hiding the hamburger of links (hamburger is only visible on mobile)
    const [openLinks, setOpenLinks] = useState(false)

    //this function is only on display on mobile and track when to show the hamburger of links when the reorder icon is clicked
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }



  return (
    <div className='navbar'>

      <div className='leftSide' id={openLinks ? "open" : "close"}> 

        <div className='logoContainer'>
          <img src={Logo} alt="Logo" />
        </div>

          {/* These links are only visible when the reorder icon is clicked on mobile*/}
          {/* A on click toggleNavbar is added to close the hamburger once a link is selected*/}
          <div className='hiddenLinks'>
           <Link to="/home" onClick={toggleNavbar}> HOME </Link>
          <Link to="/schedule" onClick={toggleNavbar}> SCHEDULE </Link>
          <Link to="/#about-section"onClick={toggleNavbar}> ABOUT </Link>
          <Link to="/contact" onClick={toggleNavbar}> CONTACT </Link>
          <a href='https://colbyathletics.com/sports/2021/11/17/giving-friends-of-recreation.aspx' onClick={toggleNavbar}> DONATE </a>
        </div>
      </div>

      <div className='rightSide'> 
        {/* these links are inivisble on mobile, only the reorder button is */}
        <Link to ="/home">  HOME </Link>
        <Link to ="/schedule">  SCHEDULE </Link>
        <Link to ="/#about-section">  ABOUT  </Link>
        <Link to ="/contact">  CONTACT  </Link>
        <a href='https://colbyathletics.com/sports/2021/11/17/giving-friends-of-recreation.aspx'>  DONATE </a>
        
        <button onClick ={toggleNavbar}>
         <ReorderIcon />
        </button>

      </div>
    </div>
  )
}

export default Navbar