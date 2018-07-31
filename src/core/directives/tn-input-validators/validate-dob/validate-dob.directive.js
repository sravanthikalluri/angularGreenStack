'use strict';

module.exports = ValidateDobDirective;

/* @ngInject */
function ValidateDobDirective(moment) {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			ctrl.$validators.dob = function(modelValue, viewValue) {
				var DOB_REGEXP = /^[0-9\/]*$/;
				var value = modelValue;

				return DOB_REGEXP.test(value) || !value;
			};
			ctrl.$validators.dobDate = function(modelValue, viewValue) {
				var value = modelValue ? modelValue : '';
				var date = (value.length === 10 ? moment(value, 'MM/DD/YYYY') : undefined);
				var isValidDate = (date && (date !== 'Invalid date') && date.isBefore(moment()));
				return isValidDate || !value;
			};
			ctrl.$validators.dobRange =function(modelValue ,viewValue)
			{
				var value = modelValue ? modelValue : '';
				var date = (value.length === 10 ? moment(value, 'MM/DD/YYYY') : undefined);
				if(date)
					{
						var startAge = moment().subtract(14, 'years').calendar();
						var startAgeObj=moment(startAge,'MM/DD/YYYY');

						var EndAge = moment().subtract(110, 'years').calendar();
						var EndAgeObj=moment(EndAge,'MM/DD/YYYY');

						var isAbove14 =date.isBefore(startAgeObj);
						var isBelow110 =EndAgeObj.isBefore(date);

						return (isAbove14 && isBelow110)|| !value;

					}
					return true;

			}
		}
	};
}
