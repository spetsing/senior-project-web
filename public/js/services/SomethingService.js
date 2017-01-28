/*jslint node: true */
/*global angular */
'use strict';

angular.module('Something')
    .factory('SomethingService', function ($resource) {
        return $resource('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    });