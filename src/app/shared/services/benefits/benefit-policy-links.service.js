'use strict';

module.exports = BenefitPolicyLinksService;

/* @ngInject */
function BenefitPolicyLinksService(DS) {
	return DS.defineResource({
		name: 'benefit-policy-links',
		idAttribute: 'id',
		basePath: 'assets/json',
		endpoint: 'benefit-policy-links.json',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsPolicyLinks : data.data
			}
		}
	});
}
