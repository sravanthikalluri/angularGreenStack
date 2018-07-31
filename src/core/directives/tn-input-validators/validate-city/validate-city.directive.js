'use strict';

module.exports = ValidateCityDirective;

function ValidateCityDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.city = function(modelValue, viewValue) {
                var CITY_REGEXP = /^[a-zA-Z-' ]*$/;
                var value = modelValue || viewValue;

                return CITY_REGEXP.test(value);
            };
        }
    };
}
