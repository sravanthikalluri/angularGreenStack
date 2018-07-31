/*Description : This is filter is used to return the Yes or No value
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = yesOrNo;
/**@ngInject**/
function yesOrNo($filter) {
	var emptyCheckFilter = $filter('emptyCheckFilter');
	return function (input) {
		if (emptyCheckFilter(input, '-') === '-') {
			return '-';
		} else if (input) {
			return ((input.toLowerCase() === 'y') ? 'Yes' : 'No');
		}
	};
}
