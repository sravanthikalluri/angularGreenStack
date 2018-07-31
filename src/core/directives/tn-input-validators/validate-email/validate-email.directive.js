'use strict';

module.exports = ValidateEmailDirective;

function ValidateEmailDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.email = function(modelValue, viewValue) {
                var EMAIL_REGEXP = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,18})$/;
                var value = modelValue || viewValue;

                return EMAIL_REGEXP.test(value);
            };
        }
    };
}
