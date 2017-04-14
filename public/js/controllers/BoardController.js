function BoardController($scope, Services) {

    $scope.services = Services;
    $scope.userName = Services.getData().userName;
    $scope.board = Services.getData().board;

    var socket = io.connect('http://34.195.93.38:3002');
    //paytons stuff

    var module = angular.module('sampleApp');
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    var fireBtn = document.getElementById("fireButton");
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("msgTxt").innerHTML = "Instructions: \n1) Place  your  ships  on  the  board  either  vertically  or  horizontally \n2)" +
        "Sink  the  enemy  ships  by  selecting  a  square  and  hitting  the  FIRE  button,  first  player  to  sink  his/her  opponent's  ship  is  the  victor \n3)Click  the  ready " +
        "button  when  ready";
    modal.style.display = "block";

    //SCOPE FUNCTIONS
    $scope.fireWeapon = function () {
        console.log(this.userName);
        var x = {
            userName: this.userName,
            board: this.board,
            cell: $scope.cell
        };
        if($scope.cell === "") {

        } else{
            socket.emit("fire", x);
            document.getElementById("fireButton").disabled = true;
            fireBtn.className = "firebutton";
        }

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
            document.getElementById("msgTxt").innerHTML = data.userName + "_missed";
            modal.style.display = "block";
            document.getElementById("fireButton").disabled = false;
            //notify user of a miss? Maybe audio clip
        } else {
            document.getElementById(data.cell).className = "missSquare";
            $scope.cell = "";
            //Update the users board who matches username- they missed and should know what spot they fired at. Maybe deactive the button entirely. Change square to white
        }
    }.bind($scope));

    socket.on("hit", function (data) {
        if (data.userName !== this.userName) {
            // alert("HIT    " + data.cell);
            document.getElementById("msgTxt").innerHTML = data.userName + "_hit_" + data.cell;
            modal.style.display = "block";
            document.getElementById("fireButton").disabled = false;

            //notify user of hit. Audio clip

        } else {
            //Update the users board who matches username- they hit and should know what spot they fired at. Maybe deactive the button entirely. Change square to red or X
            document.getElementById(data.cell).className = "hitSquare";
            $scope.cell = "";
        }
    }.bind($scope));

    socket.on("sunk", function (data) {
        if (data.userName !== this.userName) {
            document.getElementById("msgTxt").innerHTML = data.userName + "_sunk_" + data.shipName;
            // alert("SUNK   " + data.shipName);
            modal.style.display = "block";
            document.getElementById("fireButton").disabled = false;
            //notify user of ship that was sunk
            //data.shipName -- name of ship sunk

        } else {
            document.getElementById(data.cell).className = "hitSquare";
            $scope.cell="";
            document.getElementById("msgTxt").innerHTML = "You sunk " + data.userName + "'s " + data.shipName;
            modal.style.display = "block";
            //notify user that ship was sunk and update ship icon on the right
            //data.shipName -- name of ship sunk
        }
    }.bind($scope));

    socket.on("gameover", function (data) {
        //called when a user has no battleships left
        // alert("GAME OVER");
        // alert(data.userName + " WON!!!");
        document.getElementById("msgTxt").innerHTML = "Game Over!_" + data.userName + "_wins!";
        modal.style.display = "block";
        fireBtn.innerHTML = "New Game";
    }.bind($scope));



}

BoardController.$inject = [
        '$scope',
        'Services'
    ];

module.controller('BoardController', BoardController);
