'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.events',
  'myApp.view2',
  'myApp.main'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  		when('/', {
          templateUrl: './login/login.html',
          controller: 'LoginCtrl'
        }).
      when('/login', {
          templateUrl: './login/login.html',
          controller: 'LoginCtrl'
        }).
        otherwise({redirectTo: '/events'});
}]);