'use strict';

module.exports = StatesService;

/* @ngInject */
function StatesService(DS) {
	return DS.defineResource({
		name: 'states',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/countries',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				states: data.data
			};
		}
	});
}
