'use strict';

module.exports = ProfileUpdateService;

/* @ngInject */
function ProfileUpdateService(DS, profileUrlConfig) {

	function namesUpdateService() {
		return DS.defineResource({
			name: 'profile-update-names',
			idAttribute: 'id',
			basePath: '',
			endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}' +profileUrlConfig.resources.name,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return{
					id : JSON.stringify(json),
					namesInfo: json.data
				};
			}
		});
	}

	function emergencyContactUpdateService() {
		return DS.defineResource({
			name: 'profile-update-emergency-contact',
			idAttribute: 'id',
			basePath: '',
			endpoint: profileUrlConfig.profileBaseUrl +profileUrlConfig.resources.profile +'{companyId}/{empId}'+profileUrlConfig.resources.emergencyContact,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return{
					id : JSON.stringify(json),
					emergencyInfo: json.data
				};
			}
		});
	}

	function addressUpdateService() {
		return DS.defineResource({
			name: 'profile-update-address',
			idAttribute: 'id',
			basePath: '',
			endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}'+profileUrlConfig.resources.address,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return{
					id : JSON.stringify(json),
					addressInfo: json.data
				};
			}
		});
	}

	function personalInfoUpdateService() {
		return DS.defineResource({
			name: 'profile-update-personal-info',
			idAttribute: 'id',
			basePath: '',
			endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}'+profileUrlConfig.resources.personalInfo,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return{
					id : JSON.stringify(json),
					personalInfo: json.data
				};
			}
		});
	}

	function personalStatusUpdateService() {
		return DS.defineResource({
			name: 'profile-update-personal-status',
			idAttribute: 'id',
			basePath: '',
			endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}'+profileUrlConfig.resources.personalStatusUpdate,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return{
					id : JSON.stringify(json),
					personalInfo: json.data
				};
			}
		});
	}

	function contactsUpdateService() {
		return DS.defineResource({
			name: 'profile-update-contacts',
			idAttribute: 'id',
			basePath: '',
			endpoint: profileUrlConfig.profileBase +'{companyId}/{empId}'+profileUrlConfig.resources.contact + '?operation=all&enableValidation=true',
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return{
					id : JSON.stringify(json),
					contacts: json.data
				};
			}
		});
	}

	//execution for the availability of service.
	namesUpdateService();
	emergencyContactUpdateService();
	addressUpdateService();
	personalInfoUpdateService();
	personalStatusUpdateService();
	contactsUpdateService();
}
