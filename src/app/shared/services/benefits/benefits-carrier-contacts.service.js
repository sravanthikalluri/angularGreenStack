'use strict';

module.exports = BenefitsCarrierContactsService;

/* @ngInject */
function BenefitsCarrierContactsService(DS) {
	return DS.defineResource({
		name: 'benefits-carrier-contacts',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-carrier-contacts.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/carriers',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsCarrierContacts : data.data.data
			}
		}
	});
}
