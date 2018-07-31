'use strict';

module.exports = ValidateZipDirective;

function ValidateZipDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.zip = function(modelValue, viewValue) {
                var ZIP_REGEXP = /^[0-9\-]*$/;
                var value = modelValue;

                return ZIP_REGEXP.test(value) || !value;
            };

            ctrl.$validators.zipLength = function(modelValue, viewValue) {
            	var ZIP_LENGTH_REGEXP = /^[0-9]$/;
            	var value = modelValue ? modelValue.replace(/-/g, '') : '';

            	return value.length === 5 || value.length === 9;
            };
        }
    };
}
