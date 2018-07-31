/*Description : This is filter is used to filter the names
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = propsWithFilter;
function propsWithFilter() {
	return function (items, props) {
		var out = [];

		if (angular.isArray(items)) {
			items
				.forEach(function (item) {
					var itemMatches = false;

					var keys = Object.keys(props);
					for (var i = 0; i < keys.length; i++) {
						var prop = keys[i];
						var text = props[prop].toLowerCase();
						if (item[prop].toString().toLowerCase().indexOf(
								text) !== -1) {
							itemMatches = true;
							break;
						}
					}

					if (itemMatches) {
						out.push(item);
					}
				});
		} else {
			out = items;
		}
		return out;
	};
}
