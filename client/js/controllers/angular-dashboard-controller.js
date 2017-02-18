app.controller('dashboardController', ['$scope', 'dashboardFactory', '$location', '$routeParams', function($scope, dashboardFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        getUser: function(user) {
            $scope.getUserError = '';
            $scope.user = user;
        },
        getCategories: function(categories) {
            $scope.categories = categories;
        },
        post: function(newPost) {
            $scope.post = '';
            console.log('**6');
            console.log(newPost);
        },
        getUserError: function(err) {
            console.log('Errors returned from server:', err);
            $location.url('/');
        },
        newPostError: function(err) {
            $scope.newPostErrors = '';
            $scope.newPostErrors = err;
        },
    };

    // Fetch Logged In User:
    $scope.getUser = function() {
        dashboardFactory.getUser(cb.getUser, cb.getUserError);
    };
    // Run Above Function on Partial Load:
    $scope.getUser();

    // Fetch database categories:
    $scope.getCategories = function() {
        dashboardFactory.getCategories(cb.getCategories)
    }();

    // Make New Post:
    $scope.newPost = function() {
        console.log('**1');
        dashboardFactory.newPost($scope.post, cb.post, cb.newPostError);
    };

}]);
