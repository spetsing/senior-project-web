angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';


    function onClick() {
        alert("this worked");
    }

});
