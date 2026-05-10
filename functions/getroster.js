const headers = {
    'content-type' : 'application/json',
    'Access-Control-Allow-Origin': '*'
};
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
    return {
        body: JSON.stringify(data),
        statusCode: 200,
        headers: headers
    }
}