/*Description : This is filter to format the date to US date format
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = dateFormat;
/**@ngInject**/
function dateFormat($filter) {
	return function (input) {
		if (input === null) {
			return "-";
		}
		var _date = $filter('date')(new Date(input), constants.dateFormatUS);
		return _date.toUpperCase();
	};
}
