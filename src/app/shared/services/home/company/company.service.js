'use strict';

module.exports = CompanyInfoService;

/* @ngInject */
function CompanyInfoService(DS,profileUrlConfig) {
	return DS.defineResource({
		name: 'company-info',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.platform+ '/{empId}' + profileUrlConfig.resources.companies,
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}

