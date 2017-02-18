app.factory('userFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // login:
    factory.login = function(user, loginCallback, errorsCallback) {
        console.log('Factory talking...', user);
        $http.post('/login', user)
            .then(function(foundUserAndToken) {
                console.log(foundUserAndToken.data);
                $http.defaults.headers.common.Authorization = "Bearer " + foundUserAndToken.data.myToken
                loginCallback();
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // register:
    factory.register = function(newUser, registerCallback, errorsCallback) {
        console.log('Factory talking...', newUser);
        $http.post('/register', newUser)
            .then(function(newUserAndToken) {
                console.log(newUserAndToken.data);
                $http.defaults.headers.common.Authorization = "Bearer " + newUserAndToken.data.myToken
                registerCallback();
            })
            .catch(function(err) {
                console.log(err);
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    // Return Factory Object:
    return factory;
}]);
