/*Description : This is filter to add decimal zeroes for the numbers
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = decimal;
/**@ngInject**/
function decimal($filter) {
	return function (input) {
		if (input === null || input === '') {
			return "";
		}

		return $filter('number')(input, 2);

	};
}
