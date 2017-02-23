// angular.module('GeekCtrl', []).controller('GeekController', function($scope) {
//
// 	$scope.tagline = 'The square root of life is pi!';
//
// });

(function (window, angular) {

	var module = angular.module('GeekCtrl', []);

	function GeekController($scope, $location, $window) {

		var socket = io.connect('http://localhost:8080');
		socket.on('connect', function (data) {
			console.log(data);
		});

		socket.on('receive-wait', function (data) {
			if (data >= 2) {
				$window.location.href = 'http://localhost:8080/socket-test';
			}
			console.log(data);
		});

		socket.emit("waiting", "I am waiting");

		$scope.tagline = socket.sockets.sockets.length;

	}

	GeekController.$inject = [
		'$scope',
		'$location',
		'$window'
	];

	module.controller("GeekController", GeekController);

})(window, window.angular);
