'use strict';

module.exports = OnboardingGetTasksService;

/* @ngInject */
function OnboardingGetTasksService(DS, newhireUrlConfig) {

	return DS.defineResource({
		name: 'onboarding-get-tasks',
		idAttribute: 'id',
		basePath: '',
		endpoint: newhireUrlConfig.homeBaseUrl + newhireUrlConfig.resources.onboard + "/{companyId}/{empId}" + newhireUrlConfig.resources.newhireTask,
		deserialize: function (resourceConfig, data) {
			var json = data.data;
			return {
				id: JSON.stringify(json),
				data: json.data
			};
		}
	});
}