'use strict';

module.exports = CustomIdService;

/* @ngInject */
function CustomIdService(DS) {
	return DS.defineResource({
		name: 'customId',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-profile/v1/security/{companyId}/{empId}/custom-id',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (response.config.method === 'GET') {
				data.id = JSON.stringify(data);
			} else {
				data= {
					id: '1',
					response: response.data
				 };
			}

			return data;
		}
	});
}
