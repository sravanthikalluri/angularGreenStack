'use strict';

module.exports = ValidateRoutingNumberDirective;

function ValidateRoutingNumberDirective() {
	return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.routingNumber = function(modelValue, viewValue) {
                var ROUTING_REGEXP =  /^[0-3]\d{8}$/;
                var value = modelValue;

				/* Routing Number should be 9 numeric characters long and start with 0,1,2,3 only */
				if (value !== undefined) {
					if (!value.match(ROUTING_REGEXP)) {
						return false;
					}
					var x = parseInt(value.charAt(0), 10) * 3 + parseInt(value.charAt(1), 10) * 7 + parseInt(value.charAt(2), 10) * 1 + parseInt(value.charAt(3), 10) * 3 +
						parseInt(value.charAt(4), 10) * 7 + parseInt(value.charAt(5), 10) * 1 + parseInt(value.charAt(6), 10) * 3 + parseInt(value.charAt(7), 10) * 7;

					x = 10 - x % 10;

					if (x === 10) {
						x = 0;
					}

					return x !== parseInt(value.charAt(8), 10) ? false : true;
				}else{
					return false;
				}
            };

        }
    };
}
