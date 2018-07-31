'use strict';

module.exports = ValidatePostalDirective;

function ValidatePostalDirective() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.postal = function(modelValue, viewValue) {
                var POSTAL_REGEXP = /^([a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d|[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d)$/;
                var value = modelValue;

                return POSTAL_REGEXP.test(value) || !value;
            };
        }
    };
};
