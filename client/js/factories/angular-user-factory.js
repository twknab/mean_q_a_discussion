app.factory('userFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Show User on Page Load:
    factory.showUser = function(id, showUserCallback) {
        console.log('Factory');
        $http.get('/user/' + id)
            .then(function(foundUser) {
                console.log(foundUser.data);
                foundUser.data.posts = foundUser.data.posts.length;
                foundUser.data.answers = foundUser.data.answers.length;
                foundUser.data.comments = foundUser.data.comments.length;
                showUserCallback(foundUser.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Logs out User:
    factory.logout = function(logoutCallback) {
        console.log('about to send api request for logout');
        $http.post('/user/logout')
            .then(function() {
                console.log('logged out!');
                logoutCallback();
            })
            .catch(function(err) {
                console.log(err);
            })
    };

    // Return Factory Object:
    return factory;
}]);
