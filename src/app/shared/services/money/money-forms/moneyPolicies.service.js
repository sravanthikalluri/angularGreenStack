/**
 * Created by Krishnam Raju on 11/28/2016.
 */
'use strict';

module.exports = MoneyPoliciesService;

/* @ngInject */
function MoneyPoliciesService(DS) {
	return DS.defineResource({
		name: 'moneyPolicies',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-company/v1/forms/{companyId}/{empId}/',
		deserialize: function(resourceConfig, data) {
			var data = data.data.data;
			return{
				id : JSON.stringify(data),
				PoliciesDetails: data
			};
		}
	});
}
