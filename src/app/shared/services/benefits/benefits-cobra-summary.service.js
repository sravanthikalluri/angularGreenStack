'use strict';

module.exports = BenefitsCobraSummaryService;

/* @ngInject */
function BenefitsCobraSummaryService(DS) {
	return DS.defineResource({
		name: 'benefits-cobra-summary',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-benefits/v1/benefit-plan/{companyId}/{empId}/plan-details',
		deserialize: function(resourceConfig, data) {
			console.log(data);
			return {
				id : JSON.stringify(data),
				cobraSummaryData : data.data.data
			}
		}
	});
}



//https://platformbib.hrpassport.com/api-benefits/v1/benefit-plan/J1K/00001631270/plan-details?type=cobra&startDate=2016-01-01&endDate=2016-12-31
