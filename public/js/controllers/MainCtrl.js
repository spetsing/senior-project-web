angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.tagline = 'A Project By CS Students at Kennesaw State University';

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

    };
    $scope.removeUsers = function() {

        var userData={
            board: "board1",
            userName:"ss"
        };
        $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/removeplayer',
                data: userData,
                dataType: 'json',
                success: function (data) {
                    this.connectSockets();


                }.bind(this),
                error: function (err) {
                    //alert(err.responseText);
                    this.connectSockets();
                }.bind(this)
            });
        userData.board = "board2";
        $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/removeplayer',
                data: userData,
                dataType: 'json',
                success: function (data) {
                    this.connectSockets();
                }.bind(this),
                error: function (err) {
                    alert(err.responseText);
                  //  this.connectSockets();
                }.bind(this)
            });
    }


});
