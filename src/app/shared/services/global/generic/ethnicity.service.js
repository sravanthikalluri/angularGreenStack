'use strict';

module.exports = EthnicityService;

/* @ngInject */
function EthnicityService(DS) {
	return DS.defineResource({
		name: 'ethnicities',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/{countryCode}/ethnicities',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				ethnicity: data.data
			};
		}
	});
}
