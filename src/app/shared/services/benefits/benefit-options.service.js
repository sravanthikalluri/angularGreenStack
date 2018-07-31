'use strict';

module.exports = BenefitOptionsService;

/* @ngInject */
function BenefitOptionsService(DS) {
	return DS.defineResource({
		name: 'benefit-options',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefit-options.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/policies?type=overview',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitOptions : data.data.data
			}
		}
	});
}
