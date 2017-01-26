angular.module('GeekService', []).factory('Geek', ['$resource', function ($resource) {
    return $resource("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

}]);
