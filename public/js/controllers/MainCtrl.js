angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tagline = 'To the moon and back!';

    $scope.onClick = function(){
        /*var req = {
         method: 'GET',
         url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
         headers: {
           'Content-Type': undefined
         }
        }*/

        $http({
          method: 'GET',
          url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        }).then(function successCallback(response) {
            console.log(response);
          }, function errorCallback(response) {
            console.log(response);
          });

    }
    function x() {
        alert("it worked!");
    }


});
