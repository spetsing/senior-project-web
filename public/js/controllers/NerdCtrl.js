// angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
//
// 	$scope.tagline = 'Nothing beats a pocket protector!';
//
// });

(function (angular) {
	'use strict';

	var module = angular.module('NerdCtrl', ['NerdService']);

	function NerdController ($scope, NerdService) {

		$scope.getDeck = function () {
			console.log("getDeck called");
			console.log(NerdService.get());
		};

	}

	NerdController.$inject = [
		'$scope',
		'NerdService'
	];

	module.controller('NerdController', NerdController);
})(window.angular );