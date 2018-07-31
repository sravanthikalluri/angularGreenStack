'use strict';

module.exports = CompanyAnnouncementsService;

/* @ngInject */
function CompanyAnnouncementsService(DS, manageEmpUrlConfig) {
	return DS.defineResource({
		name: 'notices',
		idAttribute: 'id',
		basePath: '',
		endpoint: "/api-employee/v1/manage-employee/{companyId}/{empId}/notices",
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				res: data.data.data
			}
		}
	});
}
