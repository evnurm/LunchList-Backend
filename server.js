const express = require('express');
const app = express();
const port = 3000;
const processor = require('./restaurant_processor.js');



app.get('/', (req, res) => {
    processor.fetchAllRestaurants(result => res.json(result)); // fetch data...
    // res.json({"title": "Hello, World!"});
});

// Listen to connections on port 3000.
app.listen(port, () =>  console.log('[LUNCH LIST BACKEND]: Running on port ' + port + "."));