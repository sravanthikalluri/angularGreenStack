'use strict';

module.exports = TaxWithholdingMarriedFileSingleFilter;

function TaxWithholdingMarriedFileSingleFilter() {
	return function(data) {
		var marriedFileSingleString = data === true ? 'Yes' : (data === false ? 'No' : data);
		return marriedFileSingleString;
	}
}
