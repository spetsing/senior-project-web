var module = angular.module('sampleApp');

function MainController($scope, $http, Services, $location) {
    var that = this;
    $scope.test = "Test";
    $scope.services = Services;
    $scope.location = $location;
    var socket;
    //paytons stuff


    socket = io.connect('http://34.195.93.38:3002');

    socket.on('connect', function (data) {
        console.log(data);
        console.log("Sockets Connected");

    });

    $scope.sendHit = function () {
        var x = {
            board: $("#board").val(),
            cell: $("#cell").val()
        }

        socket.emit("sendHit", x);
    }

    $scope.resetLED = function () {
        socket.emit("turnOffLED", "");
    }

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
    //Hide elements as soon as page is rendered
    $(document).ready(function () {
        $("#waitingText").hide();
        $("#signup").hide();
    })

    $scope.onClick = function () {
        $("#signup").show();
        $("#beginGame").hide();
    };

    //Called when battle button is pressed. Attempts to register user to board and then connects sockets
    $scope.onBattle = function () {
        debugger;
        var board = "";
        var userName = $("#userName")[0].value;

        if ($("#radio01")[0].checked) {
            board = "1"
        } else {
            board = "2"
        }
        console.log(board);

        var userData = {
            userName: userName,
            board: board

        }
        this.services.setData(userData.userName, userData.board);

        //make rest call to register player to board
        $.ajax({
            type: 'POST',
            url: 'http://34.195.93.38:3002/registerplayer',
            data: userData,
            dataType: 'json',
            success: function (data) {
                $("#signup").hide();
                $("#waitingText").show();
                this.connectSockets();

            }.bind(this),
            error: function (err) {
                // this.connectSockets();
                document.getElementById("msgTxt").innerHTML = err.responseText;
                modal.style.display = "block";
                //alert(err.responseText);
            }.bind(this)
        });
    };


    //connect to sockets once player has been assigned to the board
    $scope.connectSockets = function () {
        console.log("Connect Sockets Called");
        var location = this.location;

        socket = io.connect('http://ec2-34-195-93-38.compute-1.amazonaws.com:3002');

        socket.on('connect', function (data) {
            console.log(data);

        });

        socket.on("gameReady", function (data) {
            console.log("Game Ready Routing to board");
            this.location.path("/board");
            this.$apply();
            /* $.ajax({
                type: 'GET',
                url: 'http://34.195.93.38:3002/resetHealth',
                success: function (data) {
                    console.log("Game Ready Routing to board");
                    this.location.path("/board");
                    this.$apply();

                }.bind(this),
                error: function (err) {
                    // this.connectSockets();
                    document.getElementById("msgTxt").innerHTML = err.responseText;
                    modal.style.display = "block";
                    // alert(err.responseText);
                }.bind(this)
            });*/
        }.bind(this));
    }


    //removes all players from the boards. REMOVE BEFORE LIVE
    $scope.removeUsers = function () {

        var userData = {
            board: "1",
            userName: "ss"
        };
        $.ajax({
            type: 'POST',
            url: 'http://34.195.93.38:3002/removeplayer',
            data: userData,
            dataType: 'json',
            success: function (data) {
                //this.connectSockets();


            }.bind(this),
            error: function (err) {
                //alert(err.responseText);
                //this.connectSockets();
            }.bind(this)
        });
        userData.board = "2";
        $.ajax({
            type: 'POST',
            url: 'http://34.195.93.38:3002/removeplayer',
            data: userData,
            dataType: 'json',
            success: function (data) {
                //this.connectSockets();
            }.bind(this),
            error: function (err) {
                document.getElementById("msgTxt").innerHTML = err.responseText;
                modal.style.display = "block";
                // alert(err.responseText);
                //  this.connectSockets();
            }.bind(this)
        });
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    var audio = new Audio("../sounds/player1.wav");

    function playerOne() {
        var audio = document.getElementById("radio1");
        audio.play();
    }

    function playerTwo() {
        var audio = document.getElementById("radio2");
        audio.play();
    }
}


MainController.$inject = [
		'$scope',
        '$http',
        'Services',
        '$location'
	];

module.controller('MainController', MainController);
