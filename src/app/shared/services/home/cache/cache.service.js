'use strict';

module.exports = CacheService;

/* @ngInject */
function CacheService(DS) {
	return DS.defineResource({
		name: 'cache',
		idAttribute: 'id',
		basePath: '',
		endpoint:  '/api-cache/v1/cache/{companyId}/{empId}/post-warm',
		deserialize: function(resourceConfig, response) {
			var json = response;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}

