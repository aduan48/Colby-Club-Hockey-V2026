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

        return{
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return{
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: `No schedule found for ${year}` }),
        }
    }
}
