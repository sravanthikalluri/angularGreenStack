'use strict';

module.exports = EarnsService;

/* @ngInject */
function EarnsService(DS) {
	return DS.defineResource({
		name: 'earns',
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
