'use strict';

module.exports = OrgChartFindEmployeesService;

/* @ngInject */
function OrgChartFindEmployeesService(DS) {
	return DS.defineResource({
		name: 'org-chart-find-employees',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-employee/v2/company/{companyId}/directory',
		deserialize: function(resourceConfig, data) {
			var json = data.data.data;
			return{
				id : JSON.stringify(json),
				column_names : [
					"Name",
					"Email",
					"Phone"
				],
				table_data : json
			};
		}
	});
}
