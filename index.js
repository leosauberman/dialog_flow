/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
'use strict';
const http = require('http');
const host = 'http://universities.hipolabs.com/';
exports.universityHttp = (req, res) => {
    let country = req.body.result.parameters['geo-country']; //required param
    let name = req.body.result.parameters['given-name']; //required param
    // Call the API
    callApi(city, date).then((output) => {
        // Return the results of the API to Dialogflow
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
    }).catch((error) => {
        // If there is an error let the user know
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    });
};
function callApi (country, name) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request
    let path = 'search?country=&country' + encodeURIComponent(country) + '&name=' + encodeURIComponent(name);
    console.log('API Request: ' + host + path);
    // Make the HTTP request
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        let universityName = response['data']['weather'][0];
        // Create response
        /*let output = `Current conditions in the ${location['type']} 
        ${location['query']} are ${currentConditions} with a projected high of
        ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of 
        ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on 
        ${forecast['date']}.`;
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);*/
      });
      res.on('error', (error) => {
        reject(error);
      });
    });
  });
}