'use strict';

module.exports = ValidateDollarAmountDirective;

function ValidateDollarAmountDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
			ctrl.$validators.dollarZero = function(modelValue, viewValue) {
				return +modelValue ? true : false;
			};
        }
    };
}
