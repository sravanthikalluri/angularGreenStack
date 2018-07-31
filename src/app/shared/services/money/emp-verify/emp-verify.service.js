'use strict';

module.exports = empVerifyService;

/* @ngInject */
function empVerifyService(DS, moneyUrlConfig) {
	return DS.defineResource({
		name: 'emp-verify',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.taxWithholding + '/{companyId}/{empId}' + moneyUrlConfig.resources.verification,
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			json.data.id = JSON.stringify(json);
			return json.data;
		}
	});



}
