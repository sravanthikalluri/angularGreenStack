'use strict';

module.exports = PersonalStatusService;

/* @ngInject */
function PersonalStatusService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'personalStatus',
		idAttribute: 'employeeId',
		basePath: '',
		endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}'+profileUrlConfig.resources.personalStatusUpdate,
		deserialize: function(resourceConfig, response) {
			return { employeeId: 'Dummy Value for PUT request' };
		}
	});
}
