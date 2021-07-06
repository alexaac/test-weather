const path = require('path');
const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require('express');
// Cors for cross origin allowance
const cors = require('cors');
const validation = require('./middleware/validation');
const routes = require('./routes/index');

// Start up an instance of app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // we use the engine pug

// Initialize the main project folder
app.use(express.static(path.join(__dirname, 'website')));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup Server
app.set('port', process.env.PORT || 7000);
const server = app.listen(app.get('port'), () => {
  console.log('server running');
  console.log(`running on localhost: ${server.address().port}`);
});

// Use validation
app.use(validation);

// Use routes
app.use('/', routes);
