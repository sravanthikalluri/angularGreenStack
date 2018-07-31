/*Description : This is filter class contains different data type filters for employee module
 * Author : Raghavendra Kumar Bonthala
 */

'use strict';
module.exports = checkedUnCheckedItems;
function checkedUnCheckedItems() {
	return function (items, props) {
		var out = [];
		angular.forEach(items, function (item) {
			if (item.isChecked === props.checked) {
				out.push(item);
			}
		});
		return out;
	};
}
