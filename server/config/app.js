// Any dependencies (like `express-session`) should be called here.
// var session = require('express-session');

// Setup 'client' and 'bower_components' static folders:
module.exports = function(express, app, bodyParser, path, expressJWT, jwt) {

    // If using 'express-session', setup here.
    // var sessionInfo = {
    //     secret: 'gimmeMoreCookies',
    //     resave: false,
    //     saveUninitialized: true,
    //     name: 'myCookie',
    //     cookie: {
    //         secure: false, // if using HTTPS set as true
    //         httpOnly: false, // forces HTTP if true
    //         age: 3600000, // expiration is 1 year
    //     }
    // };

    // Setup Static Folders (client and bower_components)
    app.use(express.static(path.join(__dirname, './../../client')))
        .use(express.static(path.join(__dirname, './../../bower_components')))
        // .use(session(sessionInfo))
        // .use(bodyParser.urlencoded({extended: true}))
        .use(bodyParser.json()) // setup bodyParser to send form data as JSON
        .use(expressJWT({secret: 'mySecretPasscode123!' }).unless({ path: ['/', '/login', '/register']}))
};
