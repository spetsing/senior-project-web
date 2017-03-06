/*jslint node: true */
/*global angular */
'use strict';

angular.module('Grid')
    .controller('GridCtrl', function ($scope, SomethingService, console, $window) {
        SomethingService.get(function (data) {
            console.log(data);
            $window.alert("hello world");
        });
    });
