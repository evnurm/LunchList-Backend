/**
 * FETCHES DATA FROM RESTAURANT APIS AND PROCESSES THE DATA INTO UNIFORM FORMAT.
 */

const jsonProcessor = require('./json_processor.js');
const axios = require('axios');
const fs = require('fs');

// Returns the date of Monday on the current week as YYYY-MM-dd.
function getMonday(delimiter) {
  const d = new Date();
  const year = d.getFullYear().toString();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = (d.getDate() - (d.getDay() + 6) % 7).toString().padStart(2, "0");

  return year + delimiter + month + delimiter + day;
}


// Fetches data for all restaurants.
function fetchAllRestaurants(callback) {
  let fazer = ["0190", "3101", "0199"];
  let sodexo = ["142", "26521", "13198"];

  fazer = fazer.map(code =>  getData("FAZER", code));
  sodexo = sodexo.map(code => getData("SODEXO", code));

  let restaurants;
  const addrs = fazer.concat(sodexo);
  
  axios.all(addrs).then(results => {

    let arr = results.slice(0, fazer.length).map(x => jsonProcessor.parseFazerJSON(x.data));
    arr.push(...results.slice(fazer.length, results.length).map(x => jsonProcessor.parseSodexoJSON(x.data)));
    
    callback(arr);
  
  }).catch(ex => console.log("[ERROR]: " + ex)
  );

}

function getData(company, code) {

  let addr;
  
  if (company == "FAZER") {
    addr = `https://www.fazerfoodco.fi/modules/json/json/Index?costNumber=${code}&language=fi&firstday=${getMonday("-")}`;
  } else if (company == "SODEXO") {
    addr = `https://www.sodexo.fi/ruokalistat/output/weekly_json/${code}/${getMonday("/")}/fi`;
  }

  return axios.get(addr);

}

// Updates the stored response.
function updateResponses(data) {
  fs.writeFile('./responses/test.txt', 'Lorem ipsum dolor sit amet...', (err, file) => console.log("Something happened"));
}


// EXPORTS
module.exports = {
  fetchAllRestaurants,
  updateResponses
};