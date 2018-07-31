'use strict';

module.exports = AccessTypesService;

/* @ngInject */
function AccessTypesService(DS) {
	return DS.defineResource({
		name: 'accessTypes',
		idAttribute: 'key',
		basePath: '',
		endpoint: '/api-config/v1/global/access-types',
		deserialize: function(resourceConfig, response) {
			return response.data.data
		}
	});
}
