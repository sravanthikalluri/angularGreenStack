'use strict';

module.exports = ValidateZipDirective;

function ValidateZipDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.retirementAmountCondition = function(modelValue, viewValue) {
            	return (parseFloat(modelValue) > parseFloat(attrs.fedralAmount)) ? false : true;
            };

			ctrl.$validators.zeroAmountValidation = function(modelValue, viewValue) {
				return (attrs.zeroAmountValidation === 'false') ? true : parseFloat(modelValue) === 0 ? false : true;
			};



        }
    };
}
