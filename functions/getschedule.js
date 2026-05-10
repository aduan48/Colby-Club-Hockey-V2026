const headers = {
    'content-type' : 'application/json',
    'Access-Control-Allow-Origin': '*'
};
const years = [2023, 2024, 2025, 2026];
exports.handler = async (event) => {
    if(event.queryStringParameters.year==2025){
        data = require('./schedule2025.json');
    }
    else if(event.queryStringParameters.year==2024){
        data = require('./schedule2024.json');
    }
    else if(event.queryStringParameters.year==2023){
        data = require('./schedule2023.json');
    }
    else if(event.queryStringParameters.year==2026){
        data = require('./schedule2026.json');
    }
    return {
        body: JSON.stringify(data),
        statusCode: 200,
        headers: headers
    }
}