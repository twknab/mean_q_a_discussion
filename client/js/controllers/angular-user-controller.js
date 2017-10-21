app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        show: function(user) {
            $scope.user = user;
        },
        logout: function() {
            $location.url('/');
        },
    };

    // Show User:
    $scope.showUser = function() {
      console.log("SHOW USER RUNNING");
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
        userFactory.logout(cb.logout);
    };

}]);
