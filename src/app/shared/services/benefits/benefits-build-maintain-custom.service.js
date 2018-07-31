'use strict';

module.exports = BenefitsBuildMaintainCustomService;

/* @ngInject */
function BenefitsBuildMaintainCustomService(DS) {
	return DS.defineResource({
		name: 'benefits-build-maintain-custom',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/benefit-states?payFrequency=S',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitOptions : data.data.data
			}
		}
	});
}
