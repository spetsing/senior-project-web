angular.module('GeekCtrl', []).controller('GeekController', function($scope) {

	$scope.tagline = 'The square root of life is pi!';

<<<<<<< HEAD
	var module = angular.module('GeekCtrl', []);

	function GeekController($scope, $location, $window) {

		var socket = io.connect('http://ec2-34-195-93-38.compute-1.amazonaws.com:3001');
		socket.on('connect', function (data) {
			console.log(data);
		});

		socket.on('receive-wait', function (data) {
			if (data >= 2) {
				$window.location.href = 'http://ec2-34-195-93-38.compute-1.amazonaws.com:3001';
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
=======
	setTimeout(function(){
		window.location='/socket-test';
	}, 3000);
});
>>>>>>> origin/develop
