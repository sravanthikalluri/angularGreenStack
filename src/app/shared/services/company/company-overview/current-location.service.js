'use strict';

module.exports = CurrentLocationService;

/* @ngInject */
function CurrentLocationService(DS) {
	return DS.defineResource({
		name: 'current-location',
		basePath: '',
		endpoint: '/api-config/v1/company/' + '{companyId}/{empId}' +'/current-location',
		deserialize: function(resourceConfig, data) {
			var json = data.data;
			return{
				id : JSON.stringify(json),
				data: json
			}
		}
	});
}
