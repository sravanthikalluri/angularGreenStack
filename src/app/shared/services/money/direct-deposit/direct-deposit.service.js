'use strict';

module.exports = DirectDepositService;

/* @ngInject */
function DirectDepositService(DS,moneyUrlConfig) {
	return {
		GET : DS.defineResource({
			name: 'direct-deposit',
			idAttribute: 'id',
			basePath: '',
			endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.directDeposit +'/{companyId}/{empId}' + moneyUrlConfig.resources.accounts,
			deserialize: function(resourceConfig, data) {
				var json = data.data;
				json.data.id = JSON.stringify(json);

				return json.data;
			}
		}),
		POST :  DS.defineResource({
			name: 'create-direct-deposit',
			idAttribute: 'id',
			basePath: '',
			endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.directDeposit +'/{companyId}/{empId}' + moneyUrlConfig.resources.accounts,
			deserialize: function(resourceConfig, data) {
				var json = data.data;
				return {
						id : JSON.stringify(json),
						response : json
					};
}
		}),
		DELETE :  DS.defineResource({
			name: 'delete-direct-deposit',
			idAttribute: 'id',
			basePath: '',
			endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.directDeposit +'/{companyId}/{empId}' + moneyUrlConfig.resources.accounts,
			deserialize: function(resourceConfig, data) {
				var json = data.data;
				return {
					id : JSON.stringify(json),
					response : json
				};
			}
		})
	}
}
