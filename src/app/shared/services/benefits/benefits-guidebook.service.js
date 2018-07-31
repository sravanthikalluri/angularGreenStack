'use strict';

module.exports = BenefitsGuidebookService;

/* @ngInject */
function BenefitsGuidebookService(DS) {

	var BenefitsGuidebook = DS.defineResource({
		name: 'benefits-guidebook',
		idAttribute: 'id',
		basePath: '',
		endpoint:  '/api-benefits/v1/benefit-policy/{companyId}/{empId}/guide-book'
	});

	BenefitsGuidebook.deserialize = function(resourceConfig, data) {
		var json = data.data.data;
		return {
			id: JSON.stringify(json),
			guideInfo: json
		}
	};

	return BenefitsGuidebook;
}
