'use strict';

module.exports = PaychecksService;

/* @ngInject */
function PaychecksService(DS, CheckSummaries, moment, moneyUrlConfig) {
	return DS.defineResource({
		name: 'paychecks',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll + '/{companyId}/{empId}' + moneyUrlConfig.resources.payChecks,
		deserialize: function(resourceConfig, data) {
			var json = data.data;

			json.data.id = JSON.stringify(json);
			if(json.data.checkSummaries !== undefined && json.checkSummaries !== null) {
				json.data.checkSummaries.forEach(function (check) {
					// Mock Bonus
					check.bonus = 0;
					check.date = moment(check.checkDt).toDate();
				});
			}

			json.data.lastCheckDt = json.data.checkSummaries[0].checkDt;

			return json.data;
		}
	});



}
