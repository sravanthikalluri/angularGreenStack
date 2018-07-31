'use strict';

module.exports = RolesCardService;

/* @ngInject */
function RolesCardService(DS) {
	return {
	   GET: DS.defineResource({
		name: 'roles',
		idAttribute: 'role',
		basePath: '',
		endpoint: '/api-config/v1/company/' + '{companyId}/{empId}' +'/roles',
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			return json.data;
		}
	})
   };
 }
