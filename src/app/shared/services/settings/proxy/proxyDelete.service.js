'use strict';

module.exports = ProxyService;

/* @ngInject */
function ProxyService(DS) {
	return DS.defineResource({
		name: 'ProxyDelete',
		idAttribute: 'id',
		basePath: '',
		endpoint: 'api-profile/v1/security/{companyId}/{empId}/proxy',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data= {
				id: '1',
				response: response.data
			 };
			return data;
		}
	});
}
