// Load Controllers:
var UserController = require('./../controllers/user-controller');
var PostController = require('./../controllers/post-controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/register', UserController.register)
        .post('/login', UserController.login)
        .get('/login', UserController.getLoggedIn)
        .get('/post/categories', PostController.getCategories)
        .post('/post', PostController.newPost)
};
