angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';

    $scope.onClick = function(){
        alert("Shit");
    }


});
