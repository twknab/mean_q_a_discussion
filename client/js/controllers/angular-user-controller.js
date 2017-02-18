app.controller('userController', ['$scope', 'userFactory', '$location', '$routeParams', function($scope, userFactory, $location, $routeParams) {

    // Callbacks
    var cb = {
        login: function() {
            $scope.loginErrors = '';
            $scope.user = {};
            $location.url('/dashboard');
        },
        register: function(newUser) {
            $scope.registerErrors = '';
            $scope.newUser = {};
            $location.url('/dashboard');
        },
        loginError: function(err) {
            console.log('Errors returned from server:', err);
            $scope.loginErrors = '';
            $scope.loginErrors = err;
        },
        registerError: function(err) {
            console.log('Errors returned from server:', err);
            $scope.registerErrors = err;
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
        console.log('Login Process: Angular controller running...', $scope.user);
        userFactory.login($scope.user, cb.login, cb.loginError);
    };

    // Register User:
    $scope.register = function() {
        console.log('Registering user...', $scope.newUser);
        userFactory.register($scope.newUser, cb.register, cb.registerError);
    }

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
