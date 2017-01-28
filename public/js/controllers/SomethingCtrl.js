/*jslint node: true */
/*global angular */
'use strict';

angular.module('SomethingApp', ['ngRoute', '$scope', 'SomethingService', 'console'])
    .controller('SomethingCtrl', function ($scope, SomethingService, console) {
        SomethingService.get(function (data) {
            console.log(data);
        });
    });