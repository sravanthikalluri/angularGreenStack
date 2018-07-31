'use strict';

module.exports = BenefitsVoluntaryLinksService;

/* @ngInject */
function BenefitsVoluntaryLinksService(DS) {
	return DS.defineResource({
		name: 'benefits-voluntary-links',
		idAttribute: 'id',
		basePath: '',		
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}',
		deserialize: function(responseConfig, data) {
			return {
				id: JSON.stringify(data),
				voluntaryLinks: data.data.data
			}
		}
	});
}
