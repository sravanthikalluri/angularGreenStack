'use strict';

module.exports = BenefitsPoliciesService;

/* @ngInject */
function BenefitsPoliciesService(DS) {
	return DS.defineResource({
		name: 'benefits-policies',
		idAttribute: 'id',
		basePath: 'assets/json',
		endpoint: 'benefits-policies.json',
		deserialize: function(resourceConfig, data) {
			// add ui hint
			var json = data.data.data;
			return json;
		}
	});
}
