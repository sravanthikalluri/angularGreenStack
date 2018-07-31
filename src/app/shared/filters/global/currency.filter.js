/*Description : This is filter file contains currency filters
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = currencyFilter;
/**@ngInject**/
function currencyFilter($filter) {
	var emptyCheckFilter = $filter('emptyCheckFilter');
	var currencyFilter = $filter('currency');
	return function (data) {
		if (emptyCheckFilter(data, '-') === '-') {
			return '-';
		}
		else if (data === 0 || data === 0.00) {
			return '-';
		}
		else if (data < 0) {
			var value = currencyFilter(data).substring(1, currencyFilter(data).length - 1).split('.')[0];
			var floatvalue = currencyFilter(data).substring(1, currencyFilter(data).length - 1).split('.')[1];
			if(floatvalue.length === 1){
				floatvalue = floatvalue + 0;
			}

			return '-' + value +'.'+floatvalue;
		} else if (emptyCheckFilter(data, 'undefined') === 'undefined' || emptyCheckFilter(data, '') === '') {
			return constants.zeroDoublePrecision;
		}
		else {
			return currencyFilter(data);
		}
	};
}
