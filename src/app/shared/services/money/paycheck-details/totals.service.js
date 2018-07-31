'use strict';

module.exports = TotalsService;

/* @ngInject */
function TotalsService(DS) {
	return DS.defineResource({
		name: 'totals',
		idAttribute: 'id',
		relations: {
			belongsTo: {
				detail: {
					localField: 'detail',
					localKey: 'detailId'
				}
			}
		}
	});
}
