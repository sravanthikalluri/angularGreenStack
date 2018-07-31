'use strict';

module.exports = EmployeeDetailsService;

/* @ngInject */
function EmployeeDetailsService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'emp-details',
		idAttribute: 'id',
		basePath: '',
		endpoint:  profileUrlConfig.profileApi + profileUrlConfig.profileBase + '{companyId}/{empId}' + profileUrlConfig.resources.employmentDetails + "?include=workCountryCd,workState,pfClient,posDesc,name,workCity,emplymntStatus,firstName,lastName,emplRcd,positionId",
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}
