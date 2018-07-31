'use strict';

module.exports = ValidateNewPasswordCheckDirective;

function ValidateNewPasswordCheckDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

		   ctrl.$validators.confirmPassword = function(modelValue, viewValue) {

				  //get the value of the first password
				  var e1 = modelValue;

				  //get the value of the other password
				  var e2 = scope.$eval(attrs.validateNew);
				  return e1 != e2;


			 };
        }
    };
}
