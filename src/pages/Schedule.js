import '../styles/Schedule.css'
import '../styles/Table.css'
import { useState, useEffect } from 'react';
import frontRink from '../assets/frontrink.jpg';
import bates from '../assets/opponent-logo/bates.png';
import cmcc from '../assets/opponent-logo/cmcc.png';
import dartmouth from '../assets/opponent-logo/dartmouth.png';
import sjc from '../assets/opponent-logo/sjc.png';
import thomas from '../assets/opponent-logo/thomas.png';
import une from '../assets/opponent-logo/une.png';
import wit from '../assets/opponent-logo/wit.png';
import wpi from '../assets/opponent-logo/wpi.png';
import arkansas from '../assets/opponent-logo/arkansas.png';
import saintvincent from '../assets/opponent-logo/saintvincent.png';
import lawrencetech from '../assets/opponent-logo/lawrencetech.png';
import umass from '../assets/opponent-logo/umass.png';
import curry from '../assets/opponent-logo/curry.png';
import um from '../assets/opponent-logo/um.png';
import unh from '../assets/opponent-logo/unh.png';
import necha from '../assets/opponent-logo/necha.png';
import oakland from '../assets/opponent-logo/oaklanduniversity.png';
import mines from '../assets/opponent-logo/coloradoschoolofmines.png'
import nau from '../assets/opponent-logo/nau.png'
import acha2024 from '../assets/opponent-logo/acha2024.png';
function Schedule() {
    //add wins, losses, etc once database table is set up
    const [schedule, setSchedule] = useState();
    const [scheduleYear, setScheduleYear] = useState("2025")
    const [scroll, setScroll] = useState(window.scrollY);
    const image = {
        'bates':bates,
        'cmcc': cmcc,
        'dartmouth': dartmouth,
        'sjc': sjc,
        'thomas': thomas,
        'une': une,
        'wit': wit,
        'wpi': wpi,
        'arkansas': arkansas,
        'saintvincent': saintvincent,
        'lawrencetech': lawrencetech,
        'umass': umass,
        'curry': curry,
        'unh': unh,
        'um': um,
        'oakland': oakland,
        'mines': mines,
        'nau': nau
    };
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    useEffect(() => {
        async function getSchedule() {
            try {
                const response = await fetch(`https://colbyclubhockey.com/.netlify/functions/getschedule?year=${scheduleYear}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSchedule(data);
                }
            }
            catch (error) {
                console.error('Schedule could not be loaded', error);
            }
        }
        getSchedule();
    }, [scheduleYear])

    window.addEventListener('scroll', handleScroll);
    function game(logo, homeAway, opponent, date, score) {
        return (
            <tr className='row'>
                <td><img className='schedule-logo' src={logo} alt={`${opponent} Logo`}/></td>
                <td className='center'>
                {homeAway === 'nationals' ? (
                    <img className='schedule-logo' src={acha2024} />
                ) : homeAway === 'necha' ? (
                    <img className='schedule-logo' src={necha} />
                ) : (
                    <span className={homeAway}>{homeAway}</span>
                )}
                </td>
                <td>{opponent}</td>
                <td>{date}</td>
                <td className={score.charAt(0) == 'W' ? 'win' : score.charAt(0) == 'L' ? 'loss' : ''}>{score}</td>
            </tr>
        )
    }
    const handleChange = (event)=>{
        setScheduleYear(event.target.value);
    }

    return (
        <>
            <div className='background-container'>
                <img src={frontRink} className={scroll < 3500 ? (scroll > 1600 ? 'image background active' : 'image background') : 'image background'} />
            </div>
            <header id='Schedule' className='section-header'>Schedule</header>
            <select className="dropdown" onChange={handleChange} value = {scheduleYear}>
                <option value="2025">2025 - 2026</option>
                <option value="2024">2024 - 2025</option>
                <option value= "2023">2023 - 2024</option>
            </select>
            <div className='schedule-roster'>
                <table>
                    <tbody>
                    {/* {game('unelogo.png', 'at', 'University of New England', 'Jan 27/ 3 pm', 'W 9-1')}
                    {game('unelogo.png', 'at', 'University of New England', 'Jan 27/ 3 pm', 'W 9-1')} */}
                        {schedule? Object.entries(schedule).map(([id, opponent])=>{
                            return game(image[opponent['logofile']], opponent['location'], opponent['opponent'], opponent['date'], opponent['score']);
                        }):null}

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Schedule;