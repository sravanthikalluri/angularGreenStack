'use strict';

module.exports = ValidateAnnualExemptionAmountDirective;

function ValidateAnnualExemptionAmountDirective() {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			ctrl.$validators.exemptionAmount = function(modelValue, viewValue) {
				return modelValue < 100000;
			};
		}
	};
}
