const express = require('express');
const app = express();
const port = 8000;
const processor = require('./restaurant_processor.js');

console.log("[LUNCH LIST BACKEND]: Starting up...");

let data;
console.log("[LUNCH LIST BACKEND]: Fetching data...");
processor.fetchAllRestaurants(result => data = result);
console.log("[LUNCH LIST BACKEND]: Data fetched successfully.");
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', req.get('origin'));
  next();
});

app.get('/', (req, res) => {
  res.json(data);
});

// Listen to connections on port 3000.
app.listen(port, () =>  console.log('[LUNCH LIST BACKEND]: Running on port ' + port + "."));