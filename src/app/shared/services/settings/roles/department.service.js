'use strict';

module.exports = GetDepartmentService;

/* @ngInject */
function GetDepartmentService(DS) {
   return DS.defineResource({
   		name: 'department',
   		idAttribute: 'id',
   		basePath: '',
   		endpoint: 'api-config/v1/company/' + '{companyId}' +'/departments',
   		deserialize: function(resourceConfig, response) {
   			var json = response.data;
   			var data = json.data;
            data.forEach(function(d) { d.id = JSON.stringify(d); });
			return data;
   		}
   	});
 }
