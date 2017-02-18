app.factory('dashboardFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // getUser:
    factory.getUser = function(getUserCallback, errorsCallback) {
        console.log('Factory talking...');
        $http.get('/dashboard')
            .then(function(foundUser) {
                console.log(foundUser.data);
                getUserCallback(foundUser.data);
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
