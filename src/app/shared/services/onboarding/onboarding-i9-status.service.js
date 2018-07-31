'use strict';

module.exports = OnboardingI9StatusService;

/* @ngInject */
function OnboardingI9StatusService(DS, homeUrlConfig) {
	var me = DS.defineResource({
		name: 'onboarding-i9-status',
		idAttribute: 'id',
		basePath: '',
		endpoint: homeUrlConfig.homeBase + homeUrlConfig.resources.home + "/{companyId}/{empId}" + homeUrlConfig.resources.i9Status,
		deserialize: function (resourceConfig, data) {
			var json = data.data;
			return {
				id: JSON.stringify(json),
				data: json.data
			};
		},
		
	});
	return me;
}