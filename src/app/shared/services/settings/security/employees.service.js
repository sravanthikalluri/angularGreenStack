'use strict';

module.exports = EmployeesService;

/* @ngInject */
function EmployeesService(DS) {
	return DS.defineResource({
		name: 'employees',
		idAttribute: 'employeeId',
		endpoint: '/api-employee/v1/manage-employee/{companyId}/{empId}/employees',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			return data.empLst;
		}
	});
}
