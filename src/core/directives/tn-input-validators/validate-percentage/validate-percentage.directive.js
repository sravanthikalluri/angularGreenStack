'use strict';

module.exports = ValidatePercentageDirective;

function ValidatePercentageDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

			ctrl.$validators.percentageZero = function(modelValue, viewValue) {
				return +modelValue ? true : false;
			};

            ctrl.$validators.percentage = function(modelValue, viewValue) {
				return (parseInt(modelValue) > 100) ? false : true;
            };

        }
    };
}
