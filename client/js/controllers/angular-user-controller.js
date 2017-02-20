app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        show: function(user) {
            $scope.user = user;
        },
    };

    // Show User:
    $scope.showUser = function() {
        console.log($routeParams.id);
        userFactory.showUser($routeParams.id, cb.show);
    };

    // Show User on Partial Load:
    $scope.showUser();


}]);
