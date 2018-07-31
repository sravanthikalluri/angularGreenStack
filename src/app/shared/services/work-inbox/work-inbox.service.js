'use strict';

module.exports = WorkInboxService;

/* @ngInject */

function WorkInboxService(DS,companyUrlConfig) {
	return DS.defineResource({
		name: 'work-inbox',
		idAttribute: 'id',
		endpoint: companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl+ companyUrlConfig.resources.inbox + '/' + '{companyId}/{empId}',
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			json.data.id = JSON.stringify(json);
			return json.data;
		}

	});
}
