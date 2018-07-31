'use strict';

module.exports = TaxWithholdingEffectiveDate;

/* @ngInject */
function TaxWithholdingEffectiveDate(moment) {
	var me = this;

	me.getNext = function(date) {
		var format = 'YYYY-MM-DD';
		var today = moment();
		var effectiveDate = moment(date, format);

		if (effectiveDate.isBefore(today)) {
			return today.format(format);
		} else {
			return effectiveDate.format(format);
		}
	};

	return me;
}
