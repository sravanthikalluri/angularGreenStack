'use strict';

module.exports = EmployeeDirectoryService;

/* @ngInject */
function EmployeeDirectoryService(DS) {
	return DS.defineResource({
		name: 'EmployeeDirectory',
		idAttribute: 'id',
		basePath: '',
		endpoint: 'api-employee/v2/company/{companyid}/directory?status=active&offset=1&limit=10000',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
           return {
           		id : JSON.stringify(json),
           		activeList:json.data,
           	}
			//return data;
		}
	});
}
