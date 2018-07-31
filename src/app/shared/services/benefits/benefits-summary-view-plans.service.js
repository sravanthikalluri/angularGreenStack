'use strict';

module.exports = BenefitsSummaryViewPlans;

/* @ngInject */
function BenefitsSummaryViewPlans(DS) {
	return DS.defineResource({
		name: 'benefits-summary-view-plans',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-summary-view-plans.json',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/plans',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsSummaryViewPlans : data.data.data
			}
		}
	});
}
