'use strict';

module.exports = OrgChartService;

/* @ngInject */
function OrgChartService(DS) {
	return DS.defineResource({
		name: 'org-chart',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-company/v1/organization/' + '{companyId}' + '/',
		deserialize: function(resourceConfig, data) {
		var json = data.data;
			return {
				id: JSON.stringify(json),
				data: json.data
			};
		}
	});
}
