const express = require('express');
const app = express();
const port = 3000;
const processor = require('./restaurant_processor.js');



app.get('/', (req, res) => processor.getData("SODEXO", "142", (data) => res.json(data)));

// Listen to connections on port 3000.
app.listen(port, () =>  console.log('[LUNCH LIST BACKEND]: Running on port ' + port + "."));