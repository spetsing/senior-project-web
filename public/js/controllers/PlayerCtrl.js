/**
 * Created by James on 2/12/2017.
 */
(function (window, angular) {
    'use strict';

    var module = angular.module('PlayerCtrl', []);

    function PlayerController($rootScope, $scope) {
        $scope.playerName = "";
        var name = "";
        var socket = io.connect('http://localhost:8080');
        socket.on('connect', function (data) {
            console.log(data);
        });

        $scope.tagline = "This is the PlayerController";
        $scope.messages = []; // For now this is how we will communicate with the other player

        socket.on("receive-fire", function (data) {
            $scope.$apply(function () {
                console.log("taking fire");
                console.log(data);
                if (data.userName !== name) {
                    $scope.messages.push(data);
                }
            });
        });

        $scope.fireWeapon = function () {
            name = this.playerName;
            console.log(this.playerName);
            var x = {
                userName: this.playerName,
                message: "has fired their weapon"
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
