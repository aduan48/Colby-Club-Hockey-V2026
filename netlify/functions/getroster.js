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
    if (event.queryStringParameters.year==2024){
        data = require('./roster2024.json');
    }
    else if (event.queryStringParameters.year==2023){
           data = require('./roster2023.json');
    }
    else if(event.queryStringParameters.year==2022){
        data = require('./roster2022.json');
    }
    else if(event.queryStringParameters.year==2025){
        data = require('./roster2025.json');
    }
    return {
        body: JSON.stringify(data),
        statusCode: 200,
        headers: headers
    }
}