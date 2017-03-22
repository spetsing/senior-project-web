angular.module('sampleApp', ['ngRoute', 'ngResource'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})

		.when('/board', {
			templateUrl: 'views/board.html',
			controller: 'BoardController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'UserController'
		})
		.when('/grid', {
			templateUrl: 'views/grid.html',
			controller: 'UserController'
		})
		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'
		});



	$locationProvider.html5Mode(true);

}]);
