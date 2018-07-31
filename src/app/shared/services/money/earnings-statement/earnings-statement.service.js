'use strict';

module.exports = EarningsStatement;

/* @ngInject */
function EarningsStatement(DS, moneyUrlConfig) {
	return DS.defineResource({
		name: 'earnings-statement',
		idAttribute: 'id',
		basePath: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll,
		endpoint: '',
		deserialize: function(resourceConfig, data) {
			/*************************************

				I cannot get the response type 
				to be array buffer. If you can 
				add it here and let someone know
				to change the code for earning 
				statement.

			**************************************/
			console.log(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll);
			var file = new Blob([data], { type: 'application/pdf' });
		    var fileURL = URL.createObjectURL(file);
		    window.open(fileURL);
		}
	});
}