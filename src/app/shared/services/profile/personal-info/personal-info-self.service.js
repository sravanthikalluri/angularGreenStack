'use strict';

module.exports = PersonalInfoSelfService;

/* @ngInject */
function PersonalInfoSelfService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'personalInfoSelf',
		idAttribute: 'militaryStatus',
		basePath: '',
		endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}/' + profileUrlConfig.resources.personalInfo + '/self',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data) {
				return data.activePersonalDataList[0];
			} else {
				// returns a dummy value for non-GET requests
				return { militaryStatus: 1 };
			}
		}
	});
}
