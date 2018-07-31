'use strict';

module.exports = BenefitsSummaryPlan;

/* @ngInject */
function BenefitsSummaryPlan(DS) {
	return DS.defineResource({
		name: 'benefits-summary-plan',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-summary-plan.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/summary-plan',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsSummaryPlan : data.data.data
			}
		}
	});
}
