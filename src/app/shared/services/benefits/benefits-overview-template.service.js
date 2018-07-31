'use strict';

module.exports = BenefitsOverviewTemplateService;

/* @ngInject */
function BenefitsOverviewTemplateService(DS) {
	return DS.defineResource({
		name: 'benefits-overview-template',
		idAttribute: 'id',
		basePath: 'assets/json',
		endpoint: 'benefits-overview-template.json',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsOverviewTemplate : data.data.data
			}
		}
	});
}
