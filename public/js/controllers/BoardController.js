var module = angular.module('sampleApp');

function BoardController($scope, Services) {

    $scope.services = Services;
    $scope.userName = Services.getData().userName;
    $scope.board = Services.getData().board;

    var socket = io.connect('http://34.195.93.38:3002');


    //SCOPE FUNCTIONS
    $scope.fireWeapon = function () {
        console.log(this.userName);
        var x = {
            userName: this.userName,
            board: this.board,
            cell: $scope.cell
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

    socket.on("miss", function (data) {
        if (data.userName !== this.userName) {
            alert("The Cuck missed you!!");
            //notify user of a miss? Maybe audio clip
        } else {
            //Update the users board who matches username- they missed and should know what spot they fired at. Maybe deactive the button entirely. Change square to white
        }
    }.bind($scope));

    socket.on("hit", function (data) {
        if (data.userName !== this.userName) {
            alert("HIT    " + data.cell);
            //notify user of hit. Audio clip

        } else {
            //Update the users board who matches username- they missed and should know what spot they fired at. Maybe deactive the button entirely. Change square to red or X
        }
    }.bind($scope));

    socket.on("sunk", function (data) {
        if (data.userName !== this.userName) {
            alert("SUNK   " + data.shipName);
            //notify user of ship that was sunk
            //data.shipName -- name of ship sunk

        } else {
            //Update the users board who matches username- they missed and should know what spot they fired at. Maybe deactive the button entirely. Change square to red or X
            //notify user that ship was sunk and update ship icon on the right
            //data.shipName -- name of ship sunk
        }
    }.bind($scope));

    socket.on("gameover", function (data) {
        //called when a user has no battleships left
        alert("GAME OVER");
        alert(data.userName + " WON!!!");
    }.bind($scope));

}

BoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('BoardController', BoardController);
