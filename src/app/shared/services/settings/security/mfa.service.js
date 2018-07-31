'use strict';

module.exports = MFAService;

/* @ngInject */
function MFAService(DS) {
	return DS.defineResource({
		name: 'securityMfa',
		idAttribute: 'secure',
		endpoint: '/trinetgateway/api/mfa/services/v1.0/user/{personId}/details?employeeId={empId}',
		deserialize: function(resourceConfig, response) {
			//	console.log("MFA Service ==" + response);
			var data = response.data;
			//console.log("MFA Service json ==" + JSON.stringify(data));
		
			return data;
		}
	});
}
