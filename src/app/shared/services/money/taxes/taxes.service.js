'use strict';

module.exports = TaxesService;

/* @ngInject */
function TaxesService(DS, moneyUrlConfig) {
	return DS.defineResource({
		name: 'taxes',
		idAttribute: 'effectiveDate',
		basePath: '',
		endpoint: moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.taxWithholding +'/{companyId}/{empId}' + moneyUrlConfig.resources.withHoldings,
		deserialize: function (resourceConfig, response) {
			var json = response.data;
			var data = json.data;
			if (data) {
				return data.taxWithHoldings.map(function(d){
					d.affirmationText = data.affirmationText;
					d.substantialText = data.substantialText;
					return d;
				}).filter(function(d) {
					 return d.effectiveDate !== null;
				});
			} else {
				json.effectiveDate = '9999-10-10';
				return json;
			}
		}
	});
}
