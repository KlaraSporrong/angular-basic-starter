'use strict';

angular
	.module('myApp.main', ['ngRoute'])
	.controller('MainCtrl', function ($scope, $rootScope, $anchorScroll, $location) {

	    $anchorScroll.yOffset = 160;
	    $scope.gotoAnchor = function(x) {
			var newHash = x;
			if ($location.hash() !== newHash) {
			// set the $location.hash to `newHash` and
			// $anchorScroll will automatically scroll to it
			$location.hash(x);
			} else {
			// call $anchorScroll() explicitly,
			// since $location.hash hasn't changed
			$anchorScroll();
			}
	    };

});