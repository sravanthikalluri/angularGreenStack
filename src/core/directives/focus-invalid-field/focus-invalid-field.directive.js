'use strict';

/* @ngInject */
module.exports = function ($window, $timeout){
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.on('click', function () {
                var element =angular.element('input.ng-invalid, select.ng-invalid, textarea.ng-invalid');
                var bound = element[0] && element[0].getBoundingClientRect && element[0].getBoundingClientRect();
                if(bound && bound.top <70){
                    var middle = bound.top + $window.pageYOffset - ($window.innerHeight / 2);
                    $window.scroll(0, middle);
                    element.first().focus();
                }else{
                    element.first().focus();
                }
            });
        }
    }
};
