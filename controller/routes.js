const express = require('express');
const bodyParser = require('body-parser');
const routeFunctions = require('../router-functions');
const app = express();
const urlEncoded = bodyParser.urlencoded( {extended:false} );
const json = bodyParser.json();

// Process the request to json.
// Is important for applicacion can be read the body data.
app.use( json );
// Request body is URL Encoded
app.use( urlEncoded );

// Set engine view.
app.set('view engine','pug');
// Set the port to listen the app
app.set('port', process.env.PORT || 3000 );

/**
 * The routes to listen the browser
 * HTTP request GET listening in app.get function
 */
app.get('/register', routeFunctions.registerUser );

module.exports = {
  express: express,
  app: app
}
