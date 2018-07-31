'use strict';

module.exports = ValidateCustomIDDirective;

function ValidateCustomIDDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.customID = function(modelValue, viewValue) {
                var CustomerID_REGEXP = /^[\w a-zA-Z0-9\_\-.@]*$/;
                var value = modelValue || viewValue;

                return CustomerID_REGEXP.test(value);
            };
        }
    };
}
