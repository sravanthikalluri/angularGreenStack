'use strict';

module.exports = TaxWithholdingTypeFilter;

function TaxWithholdingTypeFilter() {
	return function(data) {
		// Removes the ' tax' suffix from data.type
		var typeString = (data ? data.replace(' Tax', '') : '');


		return typeString;
	}
}
