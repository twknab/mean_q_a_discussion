app.controller('dashboardController', ['$scope', 'dashboardFactory', '$location', '$routeParams', function($scope, dashboardFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        getUser: function(user) {
            $scope.getUserError = '';
            $scope.user = user;
        },
        getCategories: function(categories) {
            console.log('getting categories...');
            $scope.categories = categories;
        },
        post: function(newPost) {
            $scope.newPostErrors = '';
            $scope.post = {};
            $scope.getAllPosts();
            console.log(newPost);
        },
        allPosts: function(allPosts) {
            $scope.allPosts = allPosts;
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
    };

    // Get categories on page load:
    $scope.getCategories();

    // Make New Post:
    $scope.newPost = function() {
        console.log($scope.post);
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

}]);
