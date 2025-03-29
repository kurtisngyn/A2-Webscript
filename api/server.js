
const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const candiesRouter = require('./routers/candies');
const categoriesRouter = require('./routers/categories');
const port = 3000;
 
// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Serve the 'public' folder as a static folder
app.use(express.static('public'));

// Use the routers 
app.use('/candies', candiesRouter);
app.use('/categories', categoriesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});