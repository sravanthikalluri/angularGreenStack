'use strict';

module.exports = PtosService;

/* @ngInject */
function PtosService(DS) {
	return DS.defineResource({
		name: 'ptos',
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
