const express = require('express');
const app = express();
const port = 3000;
const processor = require('./restaurant_processor.js');




app.get('/', (req, res) => processor.getData(0190, data => res.json(data)));

// Listen to connections on port 3000.
app.listen(port, () =>  console.log('Example App running on port ' + port + "."));