var module = angular.module('sampleApp');

function BoardController($scope, Services) {

    $scope.services = Services;
    $scope.userName = Services.getData().userName;
    $scope.board = Services.getData().board;

    var socket = io.connect('http://ec2-34-195-93-38.compute-1.amazonaws.com:3001');


    //SCOPE FUNCTIONS
    $scope.fireWeapon = function () {
        name = this.playerName;
        console.log(this.userName);
        var x = {
            userName: this.userName,
            message: $scope.cell
        };

        socket.emit("fire", x);
    };

    //variable to store cell that is pressed
    $scope.cell;
    //called when click on any celll
    $scope.onClick = function (event) {
        console.log(event.target.id + " pressed");
        $scope.cell = event.target.id;
    }

    //SOCKET FUNCTIONS


        socket.on('connect', function (data) {
            console.log(data);
        });

        socket.on("receive-fire", function (data) {
                if (data.userName !== this.userName) {
                    alert(data.message + " receiving fire");
                }

            }.bind($scope));

}

    BoardController.$inject = [
        '$scope',
        'Services'
    ];

    module.controller('BoardController', BoardController);
