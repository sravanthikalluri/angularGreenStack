'use strict';

module.exports = MaritalStatusService;

/* @ngInject */
function MaritalStatusService(DS,moneyUrlConfig) {
	return DS.defineResource({
		name: 'marital-status',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats,
		deserialize: function(resourceConfig, data) {
			var json = data.data;

			var items = json.data;

			// Create "id" field for each item
			items.forEach(function(d) { d.id = JSON.stringify(d); });

			return items;
		}
	});



}
