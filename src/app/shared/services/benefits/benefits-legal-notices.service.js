'use strict';

module.exports = BenefitsLegalNoticesService;

/* @ngInject */
function BenefitsLegalNoticesService(DS, benefitsUrlConfig) {
 	return DS.defineResource({
 		name: 'benefits-legal-notices',
 		idAttribute: 'id',
		basePath: '',
		endpoint: benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/{companyId}/{empId}/' + 'summary-plan?requestType=benefits',
		deserialize: function(resourceConfig, response) {
 			// add ui hint
			var json = response.data.data;
			json.id = JSON.stringify(json);
 			return json;

		}
	});	
}