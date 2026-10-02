const headers = {
    // Tells the client/browser that the response data is formatted as JSON
    'content-type' : 'application/json',
    
    // Enables CORS: Allows any external domain (like your frontend) to safely fetch this data
    'Access-Control-Allow-Origin': '*'
};

const DEFAULT_YEAR = '2026'; // used when no ?year= is given


/**
 * 
 * @returns the JSON data on the given year with the headers and data
 */

exports.handler = async (event) => {
    const year = event.queryStringParameters?.year || DEFAULT_YEAR;

    //only allow 4 digits
    if (!/^\d{4}$/.test(year)) {
        return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Year must be a 4-digit number' }),
        };
    }

    try {
        const data = require(`./roster${year}.json`)

        const sorted = []
        
        // blank or invalid number → Infinity so it sorts last
        const sortNumber = (player) => {
            const n = Number(player.number);
            return player.number === "" || Number.isNaN(n) ? Infinity : n;
        };

        data.forEach((player) => {
            const playerNumber = sortNumber(player);

            let i = 0;
            while (i < sorted.length && playerNumber > sortNumber(sorted[i])) {
                i++;
            }

            sorted.splice(i, 0, player);
        });

        return{
            statusCode: 200,
            headers,
            body: JSON.stringify(sorted)
        }
    } catch (error) {
        return{
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: `No roster found for ${year}` }),
        }
    }
}
