// Define Module:
var app = angular.module('app', ['ngRoute']);

// Define Routes:
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/_index.html', // root route partial
            controller: 'userController',
        })
        .when('/dashboard', {
            templateUrl: 'html/_dashboard.html', // root route partial
            controller: 'dashboardController',
        })
        // .when('/edit/:id', {
        //     templateUrl: 'html/edit.html',
        //     controller: 'editUserController',
        // })
        .otherwise({
            redirectTo: '/',
        })
});
