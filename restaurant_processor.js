/**
 * FETCHES DATA FROM RESTAURANT APIS AND PROCESSES THE DATA INTO UNIFORM FORMAT.
 */

const jsonProcessor = require('./json_processor.js');
const request = require('request');
const fs = require('fs');

// Returns the date of Monday on the current week as YYYY-MM-dd.
function getMonday(delimiter) {
  const d = new Date();
  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = (d.getDate() - (d.getDay() + 6) % 7).toString().padStart(2, "0");

  return year + delimiter + month + delimiter + day;
}


// Fetches the JSON data for the restaurant with given parameters.
function getData(company, code, callback) {

  let addr;
  
  if (company == "FAZER") {
    addr = `https://www.fazerfoodco.fi/modules/json/json/Index?costNumber=${code}&language=fi&firstday=${getMonday("-")}`;
  } else if (company == "SODEXO") {
    addr = `https://www.sodexo.fi/ruokalistat/output/weekly_json/${code}/${getMonday("/")}/fi`;
  }

  request(addr, (err, res, body) => {
      if(err) { 
        console.log(err);
      } else {
        jsonProcessor.createRestaurant(company, body, callback);
      }
    });
}

// Updates the stored response.
function updateResponses(data) {
  fs.writeFile('./responses/test.txt', 'Lorem ipsum dolor sit amet...', (err, file) => console.log("Something happened"));
}


// EXPORTS
module.exports = {
  getData,
  updateResponses
};