app.factory('indexFactory', ['$http', function($http) {
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
                $http.defaults.headers.common.Authorization = "Bearer " + foundUserAndToken.data.myToken
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
                console.log(newUserAndToken.data);
                $http.defaults.headers.common.Authorization = "Bearer " + newUserAndToken.data.myToken
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
