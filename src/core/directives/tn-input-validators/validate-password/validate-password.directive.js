'use strict';

module.exports = ValidatePasswordDirective;

function ValidatePasswordDirective() {
	return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.minLength = function(modelValue, viewValue) {
    			   if (modelValue !== undefined) {
    			      return (modelValue.length >= 8);
    			   }
                };
                ctrl.$validators.hasSpecialCharacter = function(modelValue, viewValue) {
                	var hasSpecialCharacter_REGEXP = /[!@#%^&*.:;'`/_]/;
                	var value = modelValue;
                	return hasSpecialCharacter_REGEXP.test(value);
                };

                ctrl.$validators.hasLowerCase = function(modelValue, viewValue) {
                    var hasLowerCase_REGEXP = /[a-z]/;
    				var value = modelValue;
    				return hasLowerCase_REGEXP.test(value);

    			};

    			ctrl.$validators.hasUpperCase = function(modelValue, viewValue) {
    				var hasUpperCase_REGEXP = /[A-Z]/;
    				var value = modelValue;
    				return hasUpperCase_REGEXP.test(value);
    			};

    		    ctrl.$validators.hasNumber = function(modelValue, viewValue) {
    				var hasNumber_REGEXP = /[0-9]/;
    				var value = modelValue;
    				return hasNumber_REGEXP.test(value);
    			};
            }
        };
}
