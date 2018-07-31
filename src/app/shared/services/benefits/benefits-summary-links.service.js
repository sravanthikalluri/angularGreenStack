'use strict';

module.exports = BenefitsSummaryLinks;

/* @ngInject */
function BenefitsSummaryLinks(DS) {
	return DS.defineResource({
		name: 'benefits-summary-links',
		idAttribute: 'id',
		basePath: 'assets/json',
		endpoint: 'benefits-summary-links.json', //static file
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsSummaryLinks : data.data.data
			}
		}
	});
}
