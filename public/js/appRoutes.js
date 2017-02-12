angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/socket-test', {
			templateUrl: 'views/player.html',
			controller: 'PlayerController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'UserController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'
		});

	$locationProvider.html5Mode(true);

}]);
