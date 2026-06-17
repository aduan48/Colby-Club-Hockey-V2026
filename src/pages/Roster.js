import '../styles/Table.css';
import '../styles/Roster.css';
import {useState, useEffect } from 'react';

/**
 * 
 * @returns a roster table that can swicth between the years
 */
function Roster() {
    const [roster, setRoster] = useState();
    const [rosterYear, setRosterYear] = useState("2025")

    /**
     * When ever the roster year get changed with teh drop down, it will fetch the correct roster using the getroster function
     */
    useEffect(() => {
        async function getRoster() {
            try {
                const response = await fetch(`/.netlify/functions/getroster?year=${rosterYear}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setRoster(data);
                }
            }
            catch (error) {
                console.error('Roster could not be loaded', error);
            }
        }
        getRoster();
    }, [rosterYear])

    /**
     * This creates a row with the name number position and height correctly mapped out
     * @param name 
     * @param number 
     * @param position 
     * @param height 
     * @param weight 
     * @param hand 
     * @param town 
     * @returns 
     */
    function info(name, number, position, height, weight, hand, town) {
        return (
            <tr className='row'>
                <td className="player-data">{name}</td>
                <td className="player-data">{number}</td>
                <td className="player-data">{position}</td>
                <td className="player-data">{height}</td>
                <td className="player-data">{weight}</td>
                <td className="player-data">{hand}</td>
                <td className="player-data">{town}</td>
            </tr>
        )
    }

    /**
     * 
     * Changes teh eyar when called
     */
    const handleChange = (event)=>{
        setRosterYear(event.target.value);
    }

    return (
        <>
            <header className='section-header' id='Roster'>Roster</header>

            <select className="dropdown" onChange={handleChange} value = {rosterYear}>
                <option value= "2025">2025 - 2026</option>
                <option value= "2024">2024 - 2025</option>
                <option value= "2023">2023 - 2024</option>
                <option value="2022">2022 - 2023</option>
            </select>

            <div className='schedule-roster'>
                <table className='player-table'>
                    <tbody>
                        {/*Takes the roster data and maps each entry in */}
                        {info('Player', '#', 'Pos', 'Ht', 'Wt', 'Sh', 'Birthplace')}
                        {roster? Object.entries(roster).map(([id, player]) => { 
                            return info(player['name'], player['number'], player['position'], player['height'], player['weight'], player['hand'], player['town']);
                        }):null}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Roster;
