'use strict';

module.exports = PreTaxDednsService;

/* @ngInject */
function PreTaxDednsService(DS) {
	return DS.defineResource({
		name: 'preTaxDedns',
		idAttribute: 'id',
		belongsTo: {
			detail: {
				localField: 'detail',
				localKey: 'detailId'
			}
		}
	});
}
