/*Description : This is filter is used to filter the names
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = propsFilter;
function propsFilter() {
	return function (items, props) {
		var out = [];

		if (angular.isArray(items)) {
			items.forEach(function (item) {
				var itemMatches = false;

				var keys = Object.keys(props);
				for (var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if (typeof item[prop] !== 'undefined' && item[prop].toString().toLowerCase().startsWith(text, 0)) {
						itemMatches = true;
						break;
					}
				}

				if (itemMatches) {
					out.push(item);
				}
			});
		} else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
}
