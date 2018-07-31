'use strict';

 module.exports = CompanyPoliciesService;

 /* @ngInject */
 function CompanyPoliciesService(DS) {
 	return DS.defineResource({
 		name: 'policiesService',
 		idAttribute: 'id',
 		basePath: '',
 		endpoint: '/api-company/v1/company-policy/{companyId}/{empId}',
 		deserialize: function(resourceConfig, data) {
 			var data = data.data.data;
 			return{
 				id : JSON.stringify(data),
 				policiesDetails: data
 			};
 		}
 	});
 }
