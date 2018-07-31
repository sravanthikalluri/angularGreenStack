'use strict';

module.exports = EmployeeRolesService;

/* @ngInject */
function EmployeeRolesService(DS) {
	return {
	   GET: DS.defineResource({
		name: 'EmployeeRoles',
		idAttribute: 'id',
		//basePath: 'assets/json',
        //endpoint: 'benefits-guide-book.json',
		basePath: '',
		endpoint: '/api-employee/v1/manage-employee/' + '{companyId}/{empId}' +'/employee-roles?roleType=all',
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			return {
				id: JSON.stringify(json.data),
				data: json.data
			};
		}
	})
   };
 }
