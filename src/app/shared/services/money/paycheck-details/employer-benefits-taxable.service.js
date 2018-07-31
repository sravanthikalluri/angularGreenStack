'use strict';

module.exports = EmployerBenefitsTaxable;

/* @ngInject */
function EmployerBenefitsTaxable(DS) {
	return DS.defineResource({
		name: 'employerBenefitsTaxable',
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
