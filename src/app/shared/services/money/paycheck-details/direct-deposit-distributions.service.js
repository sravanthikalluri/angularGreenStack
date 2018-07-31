'use strict';

module.exports = DirectDepositDistributionsService;

/* @ngInject */
function DirectDepositDistributionsService(DS) {
	return DS.defineResource({
		name: 'directDepositDistributions',
		idAttribute: 'id',
		relations: {
			belongsTo: {
				detail: {
					localField: 'detail',
					localKey: 'detailId'
				}
			}
		}
	})
}
