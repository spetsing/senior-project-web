/**
 * Created by James on 2/10/2017.
 */
(function (angular) {
    'use strict';

    var module = angular.module('UserCtrl', []); // Initiate module

    // Create Controller
    function UserController($rootScope, $scope) {

        $scope.tagline = "Hello World this a test";
        $scope.isBoardOneSelected = true;
        $scope.isBoardTwoSelected = false;

        $scope.toggleSelection = function () {
            // logic for board selection
            $scope.isBoardOneSelected = !$scope.isBoardOneSelected;
            $scope.isBoardTwoSelected = !$scope.isBoardTwoSelected;
        };

        $scope.createUser = function () {
            console.log($scope.userName); // Will want to create user with name, but for now just display on console
        }
    }

    UserController.$inject = [
        '$rootScope',
        '$scope'
    ];

    module.controller('UserController', UserController); // Bind controller to module

})(window.angular);