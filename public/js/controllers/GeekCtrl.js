angular.module('GeekCtrl', []).controller('GeekController', function($scope) {

	$scope.tagline = 'The square root of life is pi!';

	setTimeout(function(){
		window.location='/socket-test';
	}, 3000);
});
