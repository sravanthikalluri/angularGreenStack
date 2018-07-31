'use strict';

module.exports = ValidateAddressDirective;

function ValidateAddressDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.address = function(modelValue, viewValue) {
                var ADDRESS_REGEXP = /^[ a-zA-Z0-9#-\.]*$/;
                var value = modelValue || viewValue;
                
                return ADDRESS_REGEXP.test(value);
            };
        }
    };
}
