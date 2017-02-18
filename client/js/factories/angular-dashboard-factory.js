app.factory('dashboardFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Get Logged in User:
    factory.getUser = function(getUserCallback, errorsCallback) {
        $http.get('/login')
            .then(function(foundUser) {
                getUserCallback(foundUser.data);
            })
            .catch(function(err) {
                console.log('Error from DB:', err.data);
                errorsCallback(err.data);
            })
    };

    factory.getCategories = function(getCategoriesCallback) {
        $http.get('/post/categories')
            .then(function(allCategories) {
                getCategoriesCallback(allCategories.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    factory.newPost = function(post, postCallback, errorsCallback) {
        console.log('**2'); // <<== This is where it breaks right now.
        // the jwt tokens are saying no no
        $http.post('/post', post)
            .then(function(createdPost) {
                console.log('**5');
                postCallback(createdPost.data);
            })
            .catch(function(err) {
                console.log(err.data)
                errorsCallback(err.data);
            })
    };

    // Return Factory Object:
    return factory;
}]);
