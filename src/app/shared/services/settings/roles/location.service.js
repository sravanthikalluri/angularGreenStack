'use strict';

module.exports = GetLocationDataService;

/* @ngInject */
function GetLocationDataService(DS) {
    return DS.defineResource({
      		name: 'companyLocation',
      		idAttribute: 'id',
      		basePath: '',
      		endpoint: 'api-config/v1/company/' + '{companyId}' +'/locations',
      		deserialize: function(resourceConfig, response) {
      			var json = response.data;
      			var data = json.data;
      			 data.forEach(function(d) { d.id = JSON.stringify(d); });
      			return data;
      		}
      	});
 }
