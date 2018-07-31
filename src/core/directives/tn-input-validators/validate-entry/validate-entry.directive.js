'use strict';

module.exports = ValidateEntryCheckDirective;

function ValidateEntryCheckDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

		   	ctrl.$validators.confirmEntry = function(modelValue, viewValue) {

				  //get the value of the first entry
				  var e1 = modelValue;

				  //get the value of the other entry
				  var e2 = scope.$eval(attrs.validateEntry);
				  return e1 === e2;
			};
        }
    };
}
