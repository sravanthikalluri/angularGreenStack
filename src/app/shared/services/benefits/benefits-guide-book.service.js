'use strict';

module.exports = BenefitsGuideBook;

/* @ngInject */
function BenefitsGuideBook(DS) {
	return DS.defineResource({
		name: 'benefits-guide-book',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-guide-book.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/guide-book',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				benefitsGuideBook : data.data.data
			}
		}
	});
}
