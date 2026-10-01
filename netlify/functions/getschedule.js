// netlify/functions/getschedule.js
const headers = {
  // Tells the client/browser that the response data is formatted as JSON
  'content-type': 'application/json',

  // Enables CORS: Allows any external domain (like your frontend) to safely fetch this data
  'Access-Control-Allow-Origin': '*',
};

const DEFAULT_YEAR = '2026'; // used when no ?year= is given

/**
 * @returns the JSON schedule for the requested year, e.g. ?year=2024 loads schedule2024.json
 */
exports.handler = async (event) => {
  const year = event.queryStringParameters?.year || DEFAULT_YEAR;

  // Only allow exactly 4 digits, so the query string can't point at other files
  if (!/^\d{4}$/.test(year)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Year must be a 4-digit number' }),
    };
  }

  try {
    const data = require(`./schedule${year}.json`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // No file for that year
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: `No schedule found for ${year}` }),
    };
  }
};