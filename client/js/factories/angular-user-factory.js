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
                foundUser.data.responses = foundUser.data.responses.length;
                showUserCallback(foundUser.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Return Factory Object:
    return factory;
}]);
