'use strict';

module.exports = EmergencyContactsService;

/* @ngInject */
function EmergencyContactsService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'emergencyContacts',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +'{companyId}/{empId}/' + profileUrlConfig.resources.emergencyContact,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data) {
				data.forEach(function(d) { d.id = JSON.stringify(d); });
				return data;
			} else {
				return {
					id: response.data._requestId,
					data: response.data
				};
			}
		}
	});
}
