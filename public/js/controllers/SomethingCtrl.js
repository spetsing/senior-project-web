/*jslint node: true */
/*global angular */
'use strict';

angular.module('Something')
    .controller('SomethingCtrl', function ($scope, SomethingService, console, $window) {
        SomethingService.get(function (data) {
            console.log(data);
            $window.alert("hello world");
        });
    });