'use strict';

module.exports = TaxWithholdingTypeFilter;

function TaxWithholdingTypeFilter() {
	return function(data) {
		// Removes the ' tax' suffix from data.type
		var typeString = (data ? data.type.replace(' tax', '') : '');

		// For State tax, prefix the typeString with data.payDedCode
		if (data.type === 'State tax') {
			typeString = data.payDedCode + ' ' + typeString;
		}
		else if(data.type === 'Local tax'){
			typeString = data.desc;
		}

		return typeString;
	}
}
