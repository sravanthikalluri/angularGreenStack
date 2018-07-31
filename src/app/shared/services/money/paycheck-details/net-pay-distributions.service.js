'use strict';

module.exports = NetPayDistributionsService;

/* @ngInject */
function NetPayDistributionsService(DS) {
	return DS.defineResource({
		name: 'netPayDistributions',
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
