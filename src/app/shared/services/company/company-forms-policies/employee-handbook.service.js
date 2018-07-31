/**
 * Created by Krishnam Raju on 11/28/2016.
 */
'use strict';

module.exports = EmployeeHandbookService;

/* @ngInject */
function EmployeeHandbookService(DS) {
	return DS.defineResource({
		name: 'employee-handbook',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-company/v1/eforms/{companyId}/{empId}/form-statuses',
		deserialize: function(resourceConfig, data) {
			var data = data.data.data;
			return{
				id : JSON.stringify(data),
				handbookData: data
			};
		}
	});
}
