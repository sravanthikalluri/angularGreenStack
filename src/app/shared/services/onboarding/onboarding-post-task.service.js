'use strict';

module.exports = OnboardingPostTaskService;

/* @ngInject */
function OnboardingPostTaskService(DS, newhireUrlConfig, stringUtil) {

	var service =  DS.defineResource({
		name: 'onboarding-post-task',
		idAttribute: 'id',
		basePath: '',
		dynamicEndpoint: newhireUrlConfig.homeBaseUrl + newhireUrlConfig.resources.onboard + "/{companyId}/{empId}" + newhireUrlConfig.resources.newhireTask + "/{taskId}" + newhireUrlConfig.resources.completionDate + "{date}",
		deserialize: function (resourceConfig, data) {
			var json = data.data;
			return {
				id: JSON.stringify(json),
				data: json.data
			};
		}
	});

	return service;
}