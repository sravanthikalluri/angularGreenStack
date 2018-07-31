'use strict';

module.exports =RetirementSavingsService;

/* @ngInject */
function RetirementSavingsService(DS, moneyUrlConfig,gso) {
	return {
		fetchRetirementSavings : DS.defineResource({
			name: 'retirement-savings',
			idAttribute: 'id',
			basePath: '',
			endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/{companyId}/{empId}' + moneyUrlConfig.resources.savingPlans  + '?filter=current',
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				json.id = JSON.stringify(json);
				return json;
			}
		}),
		fetchPlanTypes : DS.defineResource({
			name: 'plan-types',
			idAttribute: 'id',
			basePath: '',
			endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/{companyId}/{empId}' + moneyUrlConfig.resources.planTypes,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				json.id = JSON.stringify(json);
				return json;
			}
		}),
		updateRetirementSavings : DS.defineResource({
			name: 'update-retirement-savings',
			idAttribute: 'id',
			basePath: '',
			endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/{companyId}/{empId}' + moneyUrlConfig.resources.contributions,
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return {
					id : JSON.stringify(json),
					response : json

				};
			}
		}),
		redirectRetirementSavings : DS.defineResource({
		name: 'redirect-retirement-savings',
		idAttribute: 'id',
		basePath: '',
		endpoint: '#/ssowidget',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			return {
				id : JSON.stringify(json),
				response : json
			};
		}
	   }),
		vendors401K : DS.defineResource({
			name: '401K-vendors',
			idAttribute: 'id',
			basePath: '',
			endpoint: 'api-config/v1/company/{companyId}/401K-vendors',
			deserialize: function(resourceConfig, response) {
				var json = response.data;
				return {
					id : JSON.stringify(json),
					response : json
				};
			}
		})
	};
}
