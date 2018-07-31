'use strict';

module.exports = SsnFilter;

function SsnFilter() {
	return function(ssn) {
		if (!ssn) {
			return '';
		}

		return '*****' + ssn.substring(5);
	}
}
