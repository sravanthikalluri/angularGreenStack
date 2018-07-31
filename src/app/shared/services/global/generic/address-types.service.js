'use strict';

module.exports = AddressTypesService;

/* @ngInject */
function AddressTypesService(DS) {
	return DS.defineResource({
		name: 'address-types',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/address-types',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				addressTypes: data.data
			};
		}
	});
}
