'use strict';

module.exports = UnderscrollFilter;

function UnderscrollFilter() {
	return function(under) {
		if (!under) {
			return '';
		}

		return under.split(" ").join("_");
	}
}
