/*Description : This is filter is used to find the unique elements
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = unique;
function unique() {
	return function (collection, keyname) {
		var output = [],
			keys = [];

		angular.forEach(collection, function (item) {
			var key = item[keyname];
			if (keys.indexOf(key) === -1) {
				keys.push(key);
				output.push(item);
			}
		});

		return output;
	};
}
