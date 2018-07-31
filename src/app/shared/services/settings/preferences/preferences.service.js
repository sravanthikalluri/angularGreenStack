'use strict';

module.exports = PreferencesService;

/* @ngInject */
function PreferencesService(DS) {
	return DS.defineResource({
		name: 'preferences',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-profile/v1/identity/{companyId}/{empId}/preferences?bypassCache=true',
		deserialize: function(resourceConfig, response) {
			var json = response.data;

			if (response.config.method === 'GET') {
			    var data = json.data;
				data.forEach(function(d) { d.id = JSON.stringify(d); });
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
