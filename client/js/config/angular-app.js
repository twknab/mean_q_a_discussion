// Define Module:
var app = angular.module('app', ['ngRoute']);

// Define Routes:
app.config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'html/_index.html', // root route partial
            controller: 'indexController',
        })
        .when('/dashboard', {
            templateUrl: 'html/_dashboard.html', // dashboard partial
            controller: 'dashboardController',
        })
        .when('/user/:id', {
            templateUrl: 'html/_user.html', // user profile partial
            controller: 'userController',
        })
        .when('/topic/:id', { // this should be called /answer/ instead of /topic, but needed to meet wireframe specs
            templateUrl: 'html/_answer.html', // post partial
            controller: 'answerController',
        })
        .otherwise({
            redirectTo: '/',
        })
});
