// Setup App Dependencies:
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    expressJWT = require('express-jwt'), // for JSON Web Tokens
    jwt = require('jsonwebtoken'), // also for JWT
    port = 8000;

// Configure App, Setup Static Folders (possibly setup Session if using)
require('./config/app')(express, app, bodyParser, path, expressJWT, jwt);

// Setup Mongoose and Models:
require('./config/db');

// Setup Custom Middleware (if using):
// require('./middleware/user')(app);

// Setup Server-Side Routing:
require('./config/routes')(app);

// Setup Server to Listen and Run:
app.listen(port, function() {
    console.log('Server listening on port:', port);
});
