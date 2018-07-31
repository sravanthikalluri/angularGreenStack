'use strict';

module.exports = I9StatusService;

/* @ngInject */
function I9StatusService(DS,moneyUrlConfig) {
	return DS.defineResource({
		name: 'i9-status',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.i9Status+ '/{empId}',
		deserialize: function(resourceConfig, response) {
			var json = response.data;

			angular.extend(json, {
				id   : JSON.stringify(json),
				data : (json.data === 'Y')
			});

			return json;
		}
	});
}
