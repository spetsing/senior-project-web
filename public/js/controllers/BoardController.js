var module = angular.module('sampleApp');
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function BoardController($scope, Services) {

    $scope.services = Services;
    $scope.userName = Services.getData().userName;
    $scope.board = Services.getData().board;

    var socket = io.connect('http://ec2-34-195-93-38.compute-1.amazonaws.com:3002');


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
    };

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
            document.getElementById("msgTxt").innerHTML = this.userName + " missed";
            // alert(this.userName + " missed you!!");
            modal.style.display = "block";
            //notify user of a miss? Maybe audio clip
        } else {
            document.getElementById(data.cell).className = "missSquare";
            //Update the users board who matches username- they missed and should know what spot they fired at. Maybe deactive the button entirely. Change square to white
        }
    }.bind($scope));

    socket.on("hit", function (data) {
        if (data.userName !== this.userName) {
            // alert("HIT    " + data.cell);
            document.getElementById("msgTxt").innerHTML = this.userName + " hit " + data.cell;
            modal.style.display = "block";
            //notify user of hit. Audio clip

        } else {
            //Update the users board who matches username- they hit and should know what spot they fired at. Maybe deactive the button entirely. Change square to red or X
            document.getElementById(data.cell).className = "hitSquare";
        }
    }.bind($scope));

    socket.on("sunk", function (data) {
        if (data.userName !== this.userName) {
            document.getElementById("msgTxt").innerHTML = this.userName + " sunk " + data.shipName;
            // alert("SUNK   " + data.shipName);
            modal.style.display = "block";
            //notify user of ship that was sunk
            //data.shipName -- name of ship sunk

        } else {
            document.getElementById("msgTxt").innerHTML = this.userName + " sunk " + data.shipName;
            // alert("SUNK   " + data.shipName);
            modal.style.display = "block";
            //notify user that ship was sunk and update ship icon on the right
            //data.shipName -- name of ship sunk
        }
    }.bind($scope));

    socket.on("gameover", function (data) {
        //called when a user has no battleships left
        // alert("GAME OVER");
        // alert(data.userName + " WON!!!");
        document.getElementById("msgTxt").innerHTML = "Game Over! " + data.userName + " wins!";
        modal.style.display = "block";
    }.bind($scope));

}

BoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('BoardController', BoardController);
