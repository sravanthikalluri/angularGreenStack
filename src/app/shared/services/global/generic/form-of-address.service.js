'use strict';

module.exports = FormOfAddressService;

/* @ngInject */
function FormOfAddressService(DS) {
	return DS.defineResource({
		name: 'formOfAddress',
		idAttribute: 'key',
		basePath: '',
		endpoint: '/api-config/v1/global/titles',
		deserialize: function(resourceConfig, response) {
			return response.data.data;
		}
	});
}
