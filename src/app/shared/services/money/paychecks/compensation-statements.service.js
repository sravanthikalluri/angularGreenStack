'use strict';

module.exports = PaycheckCityService;

/* @ngInject */
function PaycheckCityService(DS,moneyUrlConfig) {
	return DS.defineResource({
		name: 'compensation-statements',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll + '/{companyId}/{empId}' + moneyUrlConfig.resources.compensationStatement,
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			json.data.forEach(function (comp) {
				comp.id = JSON.stringify(comp);
			});

			return json.data;
		}
	});



}
