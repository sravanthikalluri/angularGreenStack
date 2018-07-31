'use strict';

module.exports = w2StatusService;

/* @ngInject */
function w2StatusService(DS, moneyUrlConfig) {
	return DS.defineResource({
		name: 'w2-status',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.taxWithholding + '/{companyId}/{empId}' + moneyUrlConfig.resources.w2details,
		deserialize: function(resourceConfig, response) {
			var json = response.data;

			angular.extend(json, {
				id   : JSON.stringify(json),
				status : json.data.status
			});

			return json;
		}
	});
}
