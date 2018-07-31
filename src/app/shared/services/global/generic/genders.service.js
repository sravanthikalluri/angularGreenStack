'use strict';

module.exports = GendersService;

/* @ngInject */
function GendersService(DS) {
	return DS.defineResource({
		name: 'genders',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/genders',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				genders: data.data
			};
		}
	});
}
