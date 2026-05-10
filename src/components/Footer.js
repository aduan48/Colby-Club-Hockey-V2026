import React from 'react'
import '../styles/Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram'
import YoutubeIcon from '@mui/icons-material/YouTube'

function Footer() {
  return (
    <div className='footer'>

    <div className='copyright'>    
        <p>&copy; {new Date().getFullYear()} Colby Club Hockey</p>
      </div>
      <div className='socialMedia'> 
        <a href = "https://m.youtube.com/channel/UCOh41arhJiIw_XcnH0Oz4Dg">
            <YoutubeIcon />
        </a>
        <a href = "https://www.instagram.com/colbyclubhockey/">
            <InstagramIcon />
        </a>

      </div>

    </div>
  )
}

export default Footer
