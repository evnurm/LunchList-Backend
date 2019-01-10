const express = require('express');
const app = express();
const port = 3000;





app.get('/', (req, res) => res.json({test: "Test"}));

// Listen to connections on port 3000.
app.listen(port, () =>  console.log('Example App running on port ' + port + "."));