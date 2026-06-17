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

/**
 * 
 * @returns The schedule page
 */
function Schedule() {

    const [schedule, setSchedule] = useState([]);//sets specific schedule data

    const [scheduleYear, setScheduleYear] = useState("2025"); //default year is most current

    /**
     * By taking the first character it will calcuate the num of wins, losses, ties, and game player
     */
    const stats = schedule.reduce((acc, game) =>{
        const result = (game.score && typeof game.score === 'string') ? game.score.trim().charAt(0).toUpperCase() : null;
        if (result === 'W') acc.wins++;
        else if (result === 'L') acc.losses++;
        else if (result === 'T') acc.ties++;
        
        if (result) acc.gp++; // Only count Games Played if there is a score
        return acc;
    }, { wins: 0, losses: 0, ties: 0, gp: 0 })

    //calucates the win percentage using the stats game played
    const winPercentage = stats.gp > 0 
        ? ((stats.wins / stats.gp) * 100).toFixed(1) 
        : 0;

    //an aray of all of teh images of the opponents
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

    /**
     * this fetches the schedule data when ever teh year get changed
     */
    useEffect(() => {
        async function fetchData() {
            try {
                // The URL is always this path relative to your domain
                const response = await fetch(`/.netlify/functions/getschedule?year=${scheduleYear}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setSchedule(data);
                } else {
                    console.error("Server responded with an error");
                }
            } catch (error) {
                console.error('Network error - check if netlify dev is running', error);
            }
        }
        fetchData();
    }, [scheduleYear]);

    /**
     * This creates a row with the information of each game mapped out
     * @param logo 
     * @param homeAway 
     * @param opponent 
     * @param date 
     * @param score 
     * @returns 
     */
    function game(logo, homeAway, opponent, date, score) {
        return (
            <tr className='row'>
                <td><img className='schedule-logo' src={logo} alt={`${opponent} Logo`}/></td>
                <td className='center'>

                {/* renders the national, necha or home and away depending on the data*/}
                {homeAway === 'nationals' ? (
                    <img className='schedule-logo' src={acha2024} alt = "" />
                ) : homeAway === 'necha' ? (
                    <img className='schedule-logo' src={necha} alt = "" />
                ) : (
                    <span className={homeAway}>{homeAway}</span>
                )}

                </td>
                <td>{opponent}</td>
                <td>{date}</td>
                {/* Changes the color of the shcedule based on css logic*/}
                <td className={score.charAt(0) === 'W' ? 'win' : score.charAt(0) === 'L' ? 'loss' : ''}>{score}</td>
            </tr>
        )
    }

    return (
        <>

            <div className='background-container'>
                <img src={frontRink} className='image background' alt = ""/>
            </div>
            <header id='Schedule' className='section-header'>Schedule</header>



            <select className="dropdown" onChange={(e) => setScheduleYear(e.target.value)} value={scheduleYear}>
                <option value="2025">2025 - 2026</option>
                <option value="2024">2024 - 2025</option>
                <option value="2023">2023 - 2024</option>
            </select>

            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-label">Record: </span>
                    <span className="stat-value">{stats.wins}-{stats.losses}-{stats.ties}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">GP: </span>
                    <span className="stat-value">{stats.gp}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Win %: </span>
                    <span className="stat-value">{winPercentage}%</span>
                </div>
            </div>

            <div className='schedule-roster'>
                <table>
                    <tbody>
                        {schedule.length > 0 ? (
                            schedule.map((gameData, index) => (
                                game(
                                    image[gameData.logofile] || acha2024, // Fallback if image missing
                                    gameData.location, 
                                    gameData.opponent, 
                                    gameData.date, 
                                    gameData.score
                                )
                            ))
                        ) : (
                            <tr><td colSpan="5" style={{color: 'white'}}>Loading {scheduleYear} Schedule...</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Schedule;