'use strict';

module.exports = HealthAndCounselingService;

/* @ngInject */
function HealthAndCounselingService(DS) {
	return DS.defineResource({
		name: 'health-and-counseling',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-guide-book.json',
		///api-benefits/v1/benefit-plan/{companyId}/{employeeId}/employee-assist-plan
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/employee-assist-plan',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				HealthAndCounselingService : data.data.data
			}
		}
	});
}
