app.controller('indexController', ['$scope', 'indexFactory', '$location', '$routeParams', function($scope, indexFactory, $location, $routeParams) {

    // Callbacks:
    var cb = {
        login: function() { // callback if login successful
            $scope.loginErrors = '';
            $scope.user = {};
            $location.url('/dashboard');
        },
        register: function(newUser) { // callback if registration successful
            $scope.registerErrors = '';
            $scope.newUser = {};
            $location.url('/dashboard');
        },
        loginError: function(err) { // callback if login error
            console.log('Errors returned from server:', err);
            $scope.loginErrors = '';
            $scope.loginErrors = err;
        },
        registerError: function(err) { // callback if register error
            console.log('Errors returned from server:', err);
            $scope.registerErrors = err;
        },
    };


    // Create Categories:
    $scope.categories = function() {
        console.log('Login Process: Angular controller running...', $scope.user);
        indexFactory.categories();
    };

    // Run Categories Creation on Page Load:
    $scope.categories();

    // Login User:
    $scope.login = function() {
        console.log('Login Process: Angular controller running...', $scope.user);
        indexFactory.login($scope.user, cb.login, cb.loginError);
    };

    // Register User:
    $scope.register = function() {
        console.log('Registering user...', $scope.newUser);
        indexFactory.register($scope.newUser, cb.register, cb.registerError);
    };

}]);
