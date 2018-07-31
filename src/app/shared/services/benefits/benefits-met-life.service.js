'use strict';

module.exports = BenefitsMetLife;

/* @ngInject */
function BenefitsMetLife(DS) {
	return DS.defineResource({
		name: 'benefits-met-life',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-met-life.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/policies?type=metlife',
		deserialize: function(responseConfig, data) {
			return {
				id: JSON.stringify(data),
				data: data.data
			}
		}
	});
}
