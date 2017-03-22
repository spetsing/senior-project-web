 var module = angular.module('sampleApp');

   module.factory('Services', function(){

        var data = {
            userName:"Steven",
            board:"Board1"
        }

        return {
            getData: function() {
                return data;
            },
            setData: function(userName,board) {
                data.userName = userName;
                data.board = board;
            }

        }

   })



