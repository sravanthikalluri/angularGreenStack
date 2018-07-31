'use strict';

module.exports = BenefitsPlansCarriersService;

/* @ngInject */
function BenefitsPlansCarriersService(DS) {
	return DS.defineResource({
		name: 'benefits-plans-carriers',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-plans-carriers.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/links',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				planCarriersCtrldocMeta : data.data.data.docMeta,
				planCarriersCtrlGeneral : data.data.data.generalInfo.generalMeta
			}
		}
	});
}
