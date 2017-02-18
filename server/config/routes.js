// Load Controllers:
var UsersController = require('./../controllers/user-controller');

// Server-Side Routes:
module.exports = function(app) {
    console.log('Server side routes loaded...');
    app.post('/register', UsersController.register)
        .post('/login', UsersController.login)
        .get('/dashboard', UsersController.getUser)
        .get('/users/:id', UsersController.findOne)
        .put('/users/:id', UsersController.update)
        .delete('/users/:id', UsersController.delete)
};
