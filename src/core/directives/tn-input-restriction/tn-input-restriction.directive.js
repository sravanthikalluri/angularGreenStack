'use strict';

module.exports = function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                	var transformedInput = text;

                	/*-- Numbers Only --*/
                	if(attr.numbersOnly && attr.numbersOnly !== "false") {
	                    transformedInput = transformedInput.replace(/[^0-9]/g, '');
                	}

					/*-- Two Decimals Only --*/
					if(attr.decimalsOnly && attr.decimalsOnly !== "false") {
						transformedInput = transformedInput.replace(/[^0-9.]/g, '');
						var decimalCheck = transformedInput.split('.');

						if (!angular.isUndefined(decimalCheck[1])) {
							decimalCheck[1] = decimalCheck[1].slice(0, 2);
							transformedInput = decimalCheck[0] + '.' + decimalCheck[1];
						}

					}

					/*-- Max Length Before Decimal Point --*/
					if(attr.maxLengthBeforeDecimal && attr.maxLengthBeforeDecimal > 0) {
						transformedInput = transformedInput.replace(/[^0-9.]/g, '');
						var beforeDecimalCheck = transformedInput.split('.');

						if (!angular.isUndefined(beforeDecimalCheck[0]) && beforeDecimalCheck[0].length > attr.maxLengthBeforeDecimal) {
							transformedInput = beforeDecimalCheck[0].substring(0, attr.maxLengthBeforeDecimal);
						}
					}


                	/*-- Max Length --*/
                	if(attr.maxLength && attr.maxLength > 0) {
            			if(transformedInput.length > attr.maxLength) {
            				transformedInput = transformedInput.substring(0, attr.maxLength);
            			}
                	}

                	//Render view value if input has been changed.
                	if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }

                	return transformedInput;
                }
                return text;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
	}
};
