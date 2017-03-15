/**
 * Created by James on 2/12/2017.
 */
(function (window, angular) {
    'use strict';

    var module = angular.module('PlayerCtrl', []);

    function PlayerController($rootScope, $scope) {

        var name = Math.random().toString().slice(2,11);
        $scope.playerName = name ;
        var socket = io.connect('http://ec2-34-195-93-38.compute-1.amazonaws.com:3001');
        socket.on('connect', function (data) {
            console.log(data);
        });

        $scope.tagline = "This is the PlayerController";
        $scope.messages = []; // For now this is how we will communicate with the other player

        socket.on("receive-fire", function (data) {

                if (data.userName !== name) {
                    alert(data.message + " receiving fire");
                }

        });

        $scope.fireWeapon = function () {
            name = this.playerName;
            console.log(this.playerName);
            var x = {
                userName: this.playerName,
                message: "has fired their weapon"
            };

            socket.emit("fire", x);
        };

        //variable to store cell that is pressed
        $scope.cell;
        //called when click on any celll
        $scope.onClick = function(event) {
            console.log(event.target.id + " pressed");
            $scope.cell = event.target.id;
            var x = {
                userName: this.playerName,
                message: event.target.id
            };

            socket.emit("fire", x);
        }


    }

    PlayerController.$inject = [
        '$scope',
        '$rootScope'
    ];

    module.controller('PlayerController', PlayerController);

})(window, window.angular);
