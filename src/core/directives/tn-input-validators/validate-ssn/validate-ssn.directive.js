'use strict';

module.exports = ValidateSsnDirective;

function ValidateSsnDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.ssn = function(modelValue, viewValue) {
                var SSN_REGEXP = /^[0-9]*$/;
                var value = modelValue;

                return SSN_REGEXP.test(value) || !value;
            };
        }
    };
}
