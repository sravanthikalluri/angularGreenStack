'use strict';

module.exports = OrgChartFindDepartmentService;

/* @ngInject */
function OrgChartFindDepartmentService(DS) {
	return DS.defineResource({
		name: 'org-chart-find-department',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-employee/v2/company/{companyId}/directory',

		deserialize: function(resourceConfig, data) {
			var json = data.data.data;
			return{
				id : JSON.stringify(json),
				column_names : [
					"Name",
					"",
					""
				],
				table_data : json
			};
		}
	});
}
