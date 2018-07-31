'use strict';

module.exports = EmployerBenefitsNonTaxableService;

/* @ngInject */
function EmployerBenefitsNonTaxableService(DS) {
	return DS.defineResource({
		name: 'employerBenefitsNonTaxable',
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
