'use strict';

module.exports = PasswordService;

/* @ngInject */
function PasswordService(DS) {
	return DS.defineResource({
		name: 'password',
		idAttribute: 'id',
		endpoint: '/api-profile/v1/security/{companyId}/{empId}/password',
		deserialize: function(resourceConfig, response) {
			return {
				id : JSON.stringify(response),
				response: response
			}
		}
	});
}
