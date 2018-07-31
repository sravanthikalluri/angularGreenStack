'use strict';

module.exports = EmployeeService;

/* @ngInject */
function EmployeeService(DS) {
	return DS.defineResource({
		name: 'employeeService',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-company/v1/organization/' + '{companyId}' + '/',
		deserialize: function(resourceConfig, data) {
			var data = data.data.data;
			return{
				id : JSON.stringify(data),
				employeeDetails: data
			};
		}
	});
}
