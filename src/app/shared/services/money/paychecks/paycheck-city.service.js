'use strict';

module.exports = PaycheckCityService;

/* @ngInject */
function PaycheckCityService(DS,moneyUrlConfig) {
	return DS.defineResource({
		name: 'paycheck-city',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll + '/{companyId}/{empId}' + moneyUrlConfig.resources.payCheckCity,
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});



}
