'use strict';

module.exports = ValidateAddlAmountDirective;

function ValidateAddlAmountDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.addlAmount = function(modelValue, viewValue) {
            	if(modelValue && viewValue) {
					var ADDRESS_REGEXP = /^[0-9]{0,5}(\.[0-9]{1,2})?$/;
					var value = modelValue || viewValue;

					return ADDRESS_REGEXP.test(value);
				}else{
            		return true;
				}
            };
        }
    };
}
