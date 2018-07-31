'use strict';

module.exports = TaxWithholdingsService;

/* @ngInject */
function TaxWithholdingsService(DS) {
	return DS.defineResource({
		name: 'taxWithholdings',
		idAttribute: 'id',
		belongsTo: {
			detail: {
				localField: 'detail',
				localKey: 'detailId'
			}
		}
	});
}
