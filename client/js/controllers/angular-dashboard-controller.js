app.controller('dashboardController', ['$scope', 'dashboardFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        getUser: function(user) {
            $scope.error = '';
            $scope.user = user;
        },
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
    };

    // Fetch Logged In User:

    $scope.getUser = function() {
        console.log('Get User Process: Angular controller running...');
        dashboardFactory.getUser(cb.getUser, cb.error);
    };

}]);
