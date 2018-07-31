'use strict';

module.exports = HRPSessionService;

/* @ngInject */
function HRPSessionService(DS,gso, loginUrlConfig) {
	return DS.defineResource({
		name: 'hrpsession-services',
		idAttribute: 'id',
		basePath: '',
		// Rewrite endpoint with person id by caller
		endpoint:   "/trinetgateway/api/mfa/services/v1.0/user",
		deserialize: function(resourceConfig, response) {
		//	console.log("HRP sessions def service...", response.data);
			var json = response.data;
			//json.id = JSON.stringify(json);
			json.id = '0';
			return json;
		}
	});
}

