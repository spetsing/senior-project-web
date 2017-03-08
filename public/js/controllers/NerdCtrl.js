// angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
//
// 	$scope.tagline = 'Nothing beats a pocket protector!';
//
// });

(function (angular) {
    'use strict';

    var module = angular.module('NerdCtrl', ['NerdService']);

    function NerdController($scope, NerdService, $location, $window) {
        var that = this;
        $("#waitingText").hide();
        $scope.waitingText="Waiting on other player"

        $scope.getDeck = function () {
            console.log("getDeck called");
            console.log(NerdService.get());
        };


        //triggered when Battle button is pressed
        $scope.onBattle = function () {
            debugger;
            var board = "";
            var userName = $("#userName")[0].value;

            if ($("#radio01")[0].checked) {
                board = "board1"
            } else {
                board = "board2"
            }
            console.log(board);

            var userData = {
                board: board,
                userName: userName
            }
            this.userData = userData;

            //make rest call to register player to board
            $.ajax({
                type: 'POST',
                url: 'http://34.195.93.38:3001/registerplayer',
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


        };

        //connect to sockets once player has been assigned to the board
        $scope.connectSockets = function () {
            console.log("worked");
            $("#signup").hide();
            $("#waitingText").css("visibility","");


            var socket = io.connect('http://ec2-34-195-93-38.compute-1.amazonaws.com:3001');
            socket.on('connect', function (data) {
                console.log(data);

            });

            socket.on("gameReady",function(data) {
                location.pathname="socket-test";
            })
        }

        $(document).ready(function() {
            $("#waitingText").hide();
        })

    };




    NerdController.$inject = [
		'$scope',
		'NerdService'
	];

    module.controller('NerdController', NerdController);
})(window.angular);
