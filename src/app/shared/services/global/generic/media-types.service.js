'use strict';

module.exports = MediaTypesService;

/* @ngInject */
function MediaTypesService(DS) {
	return DS.defineResource({
		name: 'media-types',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/media-types',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				mediaTypes: data.data
			};
		}
	});
}
