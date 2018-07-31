'use strict';

module.exports = TaxDataService;

/* @ngInject */
function TaxDataService(DS) {
	return DS.defineResource({
		name: 'taxData',
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
