'use strict';

module.exports = SsnService;

/* @ngInject */
function SsnService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'ssn',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}' + profileUrlConfig.resources.ssnInfo,
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;

			json.id = JSON.stringify(json);

			return json;
		}
	});
}
