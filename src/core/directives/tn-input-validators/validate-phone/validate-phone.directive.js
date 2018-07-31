'use strict';

module.exports = ValidatePhoneDirective;

function ValidatePhoneDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.phone = function(modelValue, viewValue) {
                var PHONE_REGEXP = /^[0-9]*$/;
                var value = modelValue;

                return PHONE_REGEXP.test(value) || !value;
            };
        }
    };
}
