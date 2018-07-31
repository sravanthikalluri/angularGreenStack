'use strict';

module.exports = BenefitsSaveMaintainCustomService;

/* @ngInject */
function BenefitsSaveMaintainCustomService(DS) {
	return DS.defineResource({
		name: 'benefits-save-maintain-custom',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/benefit-states',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitOptions : data.data.data
			}
		}
	});
}
