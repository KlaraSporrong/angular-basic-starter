'use strict';

angular.module('myApp.events', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'events/events.html',
    controller: 'EventsCtrl'
  });
}])

.controller('EventsCtrl', ['$rootScope','$scope' , function($rootScope, $scope){
	// console.log($rootScope.FB);
	// console.log($rootScope.user);
	// self.FB = $rootScope.FB;
	$scope.backgrounds = [
		'#4CAF50',
		'#FFC107',
		'#E91E63',
		'#106CC8',
		'#F44336'
	];

}]);