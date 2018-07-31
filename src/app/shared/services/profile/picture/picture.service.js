'use strict';

module.exports = ProfilePictureService;

/* @ngInject */
function ProfilePictureService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'profile-picture',
		idAttribute: 'id',
		basePath: '',
		endpoint: profileUrlConfig.profilePictureBaseUrl + '{companyId}/{empId}/'+ profileUrlConfig.resources.picture,
		deserialize: function(resourceConfig, response) {
			var json =  response.data;
			return {
				id    : JSON.stringify(json),
				response  : json
			}
		}
	});
}
