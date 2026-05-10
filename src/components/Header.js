import React from 'react'
import TeamPhoto from '../assets/Homepage.jpg'
import '../styles/Header.css'

function Header() {
  return (
    <div className='headerContainer' id="headerContainer" style={{ backgroundImage: `url(${TeamPhoto})` }}>
      {/* Container for the centered text */}
      <div className="centerTextGroup">
        <h2 className="welcomeText">WELCOME TO</h2>
        <h1>Colby Club Hockey</h1>
      </div>

      {/* Button stays at the bottom */}
      <a href="https://m.youtube.com/channel/UCOh41arhJiIw_XcnH0Oz4Dg/streams" className="watchLiveLink">
        <button>WATCH LIVE</button>
      </a>
    </div>
  )
}

export default Header