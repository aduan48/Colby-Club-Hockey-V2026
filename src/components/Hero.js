import React from 'react'
import puckWebm from '../assets/puck.webm';
import {Link } from 'react-router-dom';
import '../styles/Hero.css';

/**
 * 
 * @returns The hero section with a video plaing the the background whith the title overlay and buttons to the 
 * schedule page and teh external watch live page. The video is muted and auto plays on load. 
 * The video is a webm file for better compression and quality.
 */
function Hero() {
  return (
    <div className="hero">
         {/* Top/Center Text */}
            <div className="puck-overlay-center">
                <h1 className="puck-title" >Colby Club Hockey</h1>
                <p className="puck-subtitle" >EST. 2022</p>
            </div>

            {/* Bottom Button Area */}
            <div className="puck-overlay-bottom" >
                <a href="https://www.youtube.com/@colbyclubhockey/streams" className="watchLiveLink">
                     <button className="watch-live-btn">WATCH LIVE</button>
                </a>

                <Link to = '/schedule' className="watchLiveLink">
                     <button className="schedule-btn">SCHEDULE</button>
                </Link>
            </div>

        <div className="puck-video-container">
            <video className="puck-video" autoPlay muted loop playsInline>
            <source src={puckWebm} type="video/webm" />
            </video>
        </div>
    </div>
  )
}

export default Hero


