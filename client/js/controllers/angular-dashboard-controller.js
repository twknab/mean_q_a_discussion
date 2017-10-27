app.controller('dashboardController', ['$scope', 'dashboardFactory', 'userFactory', '$location', '$routeParams', function($scope, dashboardFactory, userFactory, $location, $routeParams) {

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
            $scope.newPostErrors = '';
            $scope.post = {};
            $scope.getAllPosts();
        },
        allPosts: function(allPosts) {
            $scope.allPosts = allPosts;
        },
        getUserError: function(err) {
            $location.url('/');
        },
        newPostError: function(err) {
            $scope.newPostErrors = '';
            $scope.newPostErrors = err;
        },
        logout: function() {
            $location.url('/');
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
    };

    // Get categories on page load:
    $scope.getCategories();

    // Make New Post:
    $scope.newPost = function() {
        dashboardFactory.newPost($scope.post, cb.post, cb.newPostError);
    };

    // Get All Posts:
    $scope.getAllPosts = function() {
        dashboardFactory.getAllPosts(cb.allPosts);
    };

    // Get All Posts on Page Load:
    $scope.getAllPosts();

    // Setup Dashboard Table Header Sorting Variables:
    $scope.propertyName = 'category.name';
    $scope.reverse = false;

    // Setup Dashboard Table Heading Toggle Click Actions:
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    // Logout:
    $scope.logout = function() {
        userFactory.logout(cb.logout);
    };

}]);
