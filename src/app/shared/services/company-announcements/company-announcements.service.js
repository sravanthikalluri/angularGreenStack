'use strict';

module.exports = CompanyAnnouncementsService;

/* @ngInject */
function CompanyAnnouncementsService(DS, manageEmpUrlConfig) {
	return DS.defineResource({
		name: 'companyAnnouncements',
		idAttribute: 'id',
		basePath: '',
		endpoint: manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/{companyId}/{empId}' +manageEmpUrlConfig.resources.announcements,
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				res: data.data.data
			}
		}
	});
}
