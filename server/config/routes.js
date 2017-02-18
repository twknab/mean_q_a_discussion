// Load Controllers:
var Controller = require('./../controllers/controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/register', Controller.register)
        .post('/login', Controller.login)
        .get('/login', Controller.getLoggedIn)
        .get('/post/categories', Controller.getCategories)
        .post('/post', Controller.newPost)
        .get('/post', Controller.getAllPosts)
};
