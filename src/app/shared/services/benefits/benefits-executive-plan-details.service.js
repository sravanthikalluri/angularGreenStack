'use strict';

module.exports = BenefitsExecutivePlanDetailsService;

/* @ngInject */
function BenefitsExecutivePlanDetailsService(DS) {
	return DS.defineResource({
		name: 'benefits-executive-plan-details',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/plan-details',
		deserialize: function(resourceConfig, data) {
			return {
				id : JSON.stringify(data),
				executiveData : data.data.data
			};
		}
	});
}


