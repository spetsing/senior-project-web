// angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
//
// 	$scope.tagline = 'Nothing beats a pocket protector!';
//
// });

(function (angular) {
	'use strict';

	var module = angular.module('NerdCtrl', ['NerdService']);

   function NerdController ($scope, NerdService) {

		$scope.getDeck = function () {
			console.log("getDeck called");
			console.log(NerdService.get());
		};

        $(function() {
            $('input:radio').hide().each(function() {
                $(this).attr('data-radio-fx', this.name);
                var label = $("label[for=" + '"' + this.id + '"' + "]").text();
                $('<a ' + (label != '' ? 'title=" ' + label + ' "' : '' ) + ' data-radio-fx="'+this.name+'" class="radio-fx" href="#">'+
                        '<span class="radio' + (this.checked ? ' radio-checked' : '') + '"></span></a>').insertAfter(this);
            });
            $('a.radio-fx').on('click', function(e) {
                e.preventDefault();
                var unique = $(this).attr('data-radio-fx');
                $("a[data-radio-fx='"+unique+"'] span").attr('class','radio');
                $(":radio[data-radio-fx='"+unique+"']").attr('checked',false);
                $(this).find('span').attr('class','radio-checked');
                $(this).prev('input:radio').attr('checked',true);
            }).on('keydown', function(e) {
                if ((e.keyCode ? e.keyCode : e.which) == 32) {
                    $(this).trigger('click');
                }
            });
            /* not needed just for sake ;)*/
            $('#form').submit(function() {
                var posts = $(this).serialize();
                if (posts != '') {
                    alert(posts);
                } else {
                    alert('please select something, then submit the form!');
                }
                return false;
            });
            $('#change-skin').change(function() {
                $('form table').attr('id', this.value);
            });

        });
        $('#skin_1 tr').click(function() {
            $(this).find('th input:radio').prop('checked', true);
        })

	}



	NerdController.$inject = [
		'$scope',
		'NerdService'
	];

	module.controller('NerdController', NerdController);
})(window.angular );
