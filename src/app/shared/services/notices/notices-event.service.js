'use strict';

module.exports = noticeEventBaseService;

/* @ngInject */
function noticeEventBaseService(DS) {
	return DS.defineResource({
		name: 'notices-event',
		idAttribute: 'id',
		basePath: '',
		endpoint: "/api-employee/v1/manage-employee/{companyId}/{empId}/event-based-notices",
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				res: data.data.data
			}
		}
	});
}
