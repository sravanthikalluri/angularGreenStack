/*Description : This is filter to add break tag in html content filters
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = breakFilter;
function breakFilter() {
	return function (text) {
		if (text !== undefined) {
			return text.replace(/\n/g, '<br />');
		}
	};
}
