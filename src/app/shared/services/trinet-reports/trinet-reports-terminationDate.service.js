'use strict';

module.exports = trinetReportsTerminationDateService;

/* @ngInject */

function trinetReportsTerminationDateService(DS,companyUrlConfig) {
	return DS.defineResource({
		name: 'termination-date',
		idAttribute: 'id',
		endpoint: companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl+'/'+ companyUrlConfig.resources.manageCompany + '/' + '{companyId}/'+ 'org-details?viewType=all',
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			json.data.id = JSON.stringify(json);
			return json.data;
		}

	});
}
