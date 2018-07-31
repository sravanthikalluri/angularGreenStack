'use strict';

module.exports = GetPayGroupService;

/* @ngInject */
function GetPayGroupService(DS) {
	return DS.defineResource({
		name: 'payGroup',
		idAttribute: 'id',
		basePath: '',
		endpoint: 'api-config/v1/company/' + '{companyId}' +'/paygroups',
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;
			data.forEach(function(d) { d.id = JSON.stringify(d); });
			return data;
		}
	});
}
