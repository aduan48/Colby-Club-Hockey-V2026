import '../styles/About.css';
//import rink from './images/siderink.jpg';
//import huddle from './images/huddle.jpg';

function About() {
  return (
    <div id="about-section">
      <header id="About" className='section-header'>About</header>
      <div className='about'>
        <div className="about-item">
          <div>

            <p>
              In 2020, Colby Club Hockey joined the American Collegiate Hockey Association (ACHA), and in 2021, we joined the Northeast Collegiate Hockey Association (NECHA), a division of the ACHA. In just our second full season, we qualified for the ACHA National Championships in St. Louis and have qualified ever since. Most recently, we won the NECHA Colonial Conference. 
            </p>
            <p>
              Our student leadership team runs all club operations, including game scheduling, budget allocation/distribution, and team events. 
            </p>
          </div>
        </div>
        <div className='about-item'>

          <p>
            Our head coach, Andrew Marshall, has achieved a 5, the highest level of coaching qualification from USA Hockey, and also leads the Maine Coast Storm as their coaching director. He brings a player-first approach, and we couldn't be luckier to have him. 
          </p>
          <p>
            We practice three times a week at Colby’s Jack Kelly Rink and play a schedule of 12 to 16 games excluding playoffs. Our players have various hockey backgrounds ranging from introductory to prep school and junior hockey, but we welcome everyone regardless of skill level!
          </p>
        </div>
      </div>

    </div>
  );
}

export default About;