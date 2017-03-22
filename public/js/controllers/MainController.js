var module = angular.module('sampleApp');

function MainController($scope, $http, Services, $location) {
    var that = this;
    $scope.test = "Test";
    $scope.services = Services;
    $scope.location = $location;
    var socket;

    //Hide elements as soon as page is rendered
    $(document).ready(function() {
        $("#waitingText").hide();
        $("#signup").hide();
    })

    $scope.onClick = function(){
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
            this.services.setData(userData.userName,userData.board);

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
                    alert(err.responseText);
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

            socket.on("gameReady",function(data) {
                console.log("Game Ready Routing to board");
                this.location.path("/board");
                this.$apply();
            }.bind(this));
        }






































    //removes all players from the boards. REMOVE BEFORE LIVE
    $scope.removeUsers = function() {

        var userData={
            board: "1",
            userName:"ss"
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
                    alert(err.responseText);
                  //  this.connectSockets();
                }.bind(this)
            });
    }
}

    MainController.$inject = [
		'$scope',
        '$http',
        'Services',
        '$location'
	];

    module.controller('MainController', MainController);
