'use strict';

module.exports = PayrollSchedulesService;

/* @ngInject */
function PayrollSchedulesService(DS,moneyUrlConfig) {
	return DS.defineResource({
		name: 'payrollSchedules',
		idAttribute: 'id',
		basePath: '',
		endpoint:  moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll +'/{companyId}/{empId}' + moneyUrlConfig.resources.payrollDates+'?payDay=previous,next',
		deserialize: function(responseConfig, data) {
			var json = data.data;

			return {
				id : JSON.stringify(json),
				lastPaycheck: json.data.previous,
				nextPaycheck: json.data.next
			};
		}
	});
}
