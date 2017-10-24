app.factory('dashboardFactory', ['$http', function($http) {
    // Setup Factory Object:
    var factory = {};

    // Get Logged in User:
    factory.getUser = function(getUserCallback, errorsCallback) {
        $http.get('/login')
            .then(function(foundUser) {
                // $http.defaults.headers.common.Authorization = "Bearer " + foundUser.data.myToken;
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
        $http.post('/post', post)
            .then(function(createdPost) {
                postCallback(createdPost.data);
            })
            .catch(function(err) {
                console.log(err.data)
                errorsCallback(err.data);
            })
    };

    factory.getAllPosts = function(allPostsCallback) {
        $http.get('/post')
            .then(function(allPosts) {
                allPostsCallback(allPosts.data);
            })
            .catch(function(err) {
                console.log(err.data);
            })
    };

    // Return Factory Object:
    return factory;
}]);
