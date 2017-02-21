app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        show: function(user) {
            $scope.user = user;
        },
        logout: function() {
            console.log('url redirecting...');
            $location.url('/');
        },
    };

    // Show User:
    $scope.showUser = function() {
        console.log($routeParams.id);
        userFactory.showUser($routeParams.id, cb.show);
    };

    // Show User on Partial Load:
    $scope.showUser();

    // Dashboard Home Button:
    $scope.dashboard = function() {
        $location.url('/dashboard');
    };

    // Logout:
    $scope.logout = function() {
        console.log('logging out..');
        userFactory.logout(cb.logout);
    };

}]);
