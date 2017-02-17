app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        login: function(newUser) {
            $scope.error = '';
            $scope.person = {};
            $location.url('/dashboard');
        },
        error: function(err) {
            console.log('Errors returned from server:', err);
            $scope.error = err;
        },
        show: function(allUsers) {
            console.log(allUsers);
            $scope.allUsers = allUsers;
        },
        delete: function() {
            $scope.show();
        },
    };

    // Login User:
    $scope.login = function() {
        console.log('Login Process: Angular controller running...', $scope.person);
        userFactory.login($scope.person, cb.login, cb.error);
    };

    // Show Users:
    $scope.show = function() {
        console.log('Showing all users...');
        userFactory.show(cb.show);
    };

    // Delete User:
    $scope.delete = function(user) {
        console.log('DELETING USER');
        userFactory.delete(user, cb.delete);
    };

}]);
