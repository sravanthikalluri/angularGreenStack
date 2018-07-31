'use strict';

module.exports = PermissionsService;

/* @ngInject */
function PermissionsService(DS, homeUrlConfig) {
	return DS.defineResource({
		name: 'permissions',
		idAttribute: 'id',
		basePath: '',
		endpoint:  homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/{companyId}/{empId}' + homeUrlConfig.resources.perm,
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}

