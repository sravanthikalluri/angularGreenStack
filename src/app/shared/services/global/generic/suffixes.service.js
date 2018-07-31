'use strict';

module.exports = SuffixesService;

/* @ngInject */
function SuffixesService(DS) {
	return DS.defineResource({
		name: 'suffixes',
		idAttribute: 'key',
		basePath: '',
		endpoint: '/api-config/v1/global/suffixes',
		deserialize: function(resourceConfig, response) {
			return response.data.data;
		}
	});
}
