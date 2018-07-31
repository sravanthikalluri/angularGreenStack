'use strict';

module.exports = PayrollScheduleService;

/* @ngInject */
function PayrollScheduleService(DS,moneyUrlConfig) {
	return DS.defineResource({
		name: 'payrollSchedule',
		idAttribute: 'id',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll +'/{companyId}/{empId}',
		deserialize: function(responseConfig, response) {
			var json = response.data;
			var items = json.data.payCalItems;

			// Create "id" field for each item
			items.forEach(function(d) { d.id = JSON.stringify(d); });

			return items;
		}
	});
}
