// Setup 'client' and 'bower_components' static folders:
module.exports = function(express, app, bodyParser, path, expressJWT, jwt) {

    // Setup Static Folders (client and bower_components)
    app.use(express.static(path.join(__dirname, './../../client')))
        .use(express.static(path.join(__dirname, './../../bower_components')))
        // .use(session(sessionInfo))
        // .use(bodyParser.urlencoded({extended: true}))
        .use(bodyParser.json()) // setup bodyParser to send form data as JSON
        .use(expressJWT({secret: 'mySecretPasscode123!' }).unless({ path: ['/', '/login', '/register', '/post', '/user/:id', '/post/categories', '/topic:id', '/answer']}));
};
