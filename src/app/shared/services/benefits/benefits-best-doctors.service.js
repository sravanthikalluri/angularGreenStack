'use strict';

module.exports = BenefitsBestDoctorsService;

/* @ngInject */
function BenefitsBestDoctorsService(DS) {
	return DS.defineResource({
		name: 'benefits-best-doctors',
		idAttribute: 'id',
		basePath: '',
		endpoint:  '/api-benefits/v1/benefit-policy/{companyId}/{empId}',		
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				bestDoctorsInfo : data.data.data
			}
		}
	});
}