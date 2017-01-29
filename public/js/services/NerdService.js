// angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {
//
//
// }]);

(function (angular) {
    'use strict';

    var module = angular.module('NerdService', []);

    function NerdService($resource) {
        return $resource('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    }

    NerdService.$inject = [
        '$resource'
    ];

    module.service('NerdService', NerdService);

})(window.angular);
