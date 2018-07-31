/**
 * Created by Krishnam Raju on 2/17/2017.
 */
'use strict';

module.exports = BenefitAcaMarketPlace;

/* @ngInject */
function BenefitAcaMarketPlace(DS) {
	return DS.defineResource({
		name: 'benefit-aca-marketplace',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefit-options.json',
		endpoint: '/api-benefits/v1/benefit-policy/{companyId}/{empId}/policies?type=acampnotification',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				acaMarketPlace : data.data.data
			}
		}
	});
}
