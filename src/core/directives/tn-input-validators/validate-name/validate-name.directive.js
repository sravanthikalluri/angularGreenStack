'use strict';

module.exports = ValidateNameDirective;

function ValidateNameDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.name = function(modelValue, viewValue) {
                var NAME_REGEXP = /^[\w a-zA-Z0-9\'\,\-.&*]+$/;
                var value = modelValue || viewValue;

				return (value === '') ? true : NAME_REGEXP.test(value);
            };
        }
    };
}
