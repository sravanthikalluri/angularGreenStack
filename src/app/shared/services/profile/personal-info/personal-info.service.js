'use strict';

module.exports = PersonalInfoService;

/* @ngInject */
function PersonalInfoService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'personalInfo',
		idAttribute: 'uniqueId',
		queryParams: { effectivedate: '' },
		basePath: '',
		endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}/' + profileUrlConfig.resources.personalInfo,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data) {
				return data.activePersonalDataList[0];
			} else {
				// returns a dummy value for non-GET requests
				return { uniqueId: 1 };
			}
		}
	});
}
