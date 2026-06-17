// netlify/functions/getschedule.js
const headers = {
    // Tells the client/browser that the response data is formatted as JSON
    'content-type' : 'application/json',
    
    // Enables CORS: Allows any external domain (like your frontend) to safely fetch this data
    'Access-Control-Allow-Origin': '*'
};

/**
 * 
 * @returns the JSON data on the given year with the headers and data
 */
exports.handler = async (event) => {
    try {
        const year = event.queryStringParameters.year;
        let data;

        // Using a switch or if/else is fine, but ensure paths are correct
        if (year === "2025") {
            data = require('./schedule2025.json');
        } else if (year === "2024") {
            data = require('./schedule2024.json');
        } else {
            data = require('./schedule2023.json');
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to load schedule file" }),
        };
    }
};