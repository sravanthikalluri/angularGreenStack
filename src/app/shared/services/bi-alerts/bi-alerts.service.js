'use strict';

module.exports = BiAlertsService;

/* @ngInject */

function BiAlertsService(DS,companyUrlConfig) {
	return DS.defineResource({
		name: 'bi-alerts',
		idAttribute: 'id',
		endpoint: companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl+ companyUrlConfig.resources.alerts + '/' + '{companyId}/{empId}' + companyUrlConfig.resources.biAlerts,
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			return {
					id :	JSON.stringify(json),
					data : json.data
				};
		}

	});
}
