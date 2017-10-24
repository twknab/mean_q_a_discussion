app.factory('indexFactory', ['$http', '$window', 'tokenService', function($http, $window, tokenService) {
    // Setup Factory Object:
    var factory = {};

    // Create categories:
    factory.categories = function() {
        $http.post('/post/categories')
            .then(function(message) {
                // console.log(message.data);
            })
            .catch(function(err) {
                console.log('Error from DB:', err.data);
            })
    };

    // Login:
    factory.login = function(user, loginCallback, errorsCallback) {
        $http.post('/login', user)
            .then(function(foundUserAndToken) {
                console.log("Hash verified.");
                tokenService.saveToken(foundUserAndToken.data.myToken);
                console.log("Token saved.");
                loginCallback();
            })
            .catch(function(err) {
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // Register:
    factory.register = function(newUser, registerCallback, errorsCallback) {
        $http.post('/register', newUser)
            .then(function(newUserAndToken) {
                // Save token to local storage:
                tokenService.saveToken(newUserAndToken.data.myToken);
                registerCallback();
            })
            .catch(function(err) {
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // Return Factory Object:
    return factory;
}]);
