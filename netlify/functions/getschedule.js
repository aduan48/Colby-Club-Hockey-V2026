// netlify/functions/getschedule.js
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Allows your React app to talk to it
};

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