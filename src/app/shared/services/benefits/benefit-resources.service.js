'use strict';

module.exports = BenefitResourcesService;

/* @ngInject */
function BenefitResourcesService(DS) {
	return DS.defineResource({
		name: 'benefit-resources',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/resources?type=benefitResources',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitResources : data.data.data
			}
		}
	});
}
