'use strict';

module.exports = TotalEmployeeDetailsService;

/* @ngInject */
function TotalEmployeeDetailsService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'emp-details-all',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}' + profileUrlConfig.resources.totalEmpDetails ,
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return {
                id: json.id,
                data: json
            }
		}
	});
}
