'use strict';

module.exports = EmployerBenefitsService;

/* @ngInject */
function EmployerBenefitsService(DS) {
	return DS.defineResource({
		name: 'employerBenefits',
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
