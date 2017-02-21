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
        .get('/post/:id', Controller.getPost)
        .get('/user/:id', Controller.getUser)
        .post('/answer', Controller.newAnswer)
        .get('/answer', Controller.getAllAnswers)
        .post('/answer/vote/up/', Controller.upVote)
        .post('/answer/vote/down/', Controller.downVote)
        .post('/comment', Controller.newComment)
        // .get('/comment', Controller.getAllComments)
};
