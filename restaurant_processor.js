const request = require('request');

// Fetches the JSON data for the restaurant with given parameters.
function getData(code, callback) {
    request('https://www.fazerfoodco.fi/modules/json/json/Index?costNumber=0190&language=fi', (err, res, body) => {
      if(err) { 
        console.log(err);
      } else {
        callback(body);
      }
    }); 
}

module.exports = {
  getData
};