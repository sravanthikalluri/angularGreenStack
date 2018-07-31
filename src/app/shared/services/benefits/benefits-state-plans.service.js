'use strict';

module.exports = BenefitsStatePlansService;

/* @ngInject */
function BenefitsStatePlansService(DS) {
	return DS.defineResource({
		name: 'benefits-state-plans',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-state-plans.json',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/plan-details',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				statePlanData : data.data.data
			}
		}
	});
}
