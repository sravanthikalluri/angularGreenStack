'use strict';

module.exports = CitizenShipService;

/* @ngInject */
function CitizenShipService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'citizenship',
		idAttribute: 'employeeId',
		basePath: '',
		endpoint: profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +'{companyId}/{empId}/' + profileUrlConfig.resources.citizenship,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			return data;
		}
	});
}
