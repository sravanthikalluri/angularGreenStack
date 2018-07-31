'use strict';

module.exports = CountriesService;

/* @ngInject */
function CountriesService(DS) {
	return DS.defineResource({
		name: 'countries',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/countries',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				countries: data.data
			};
		}
	});
}
