'use strict';

module.exports = LocationsService;

/* @ngInject */
function LocationsService(DS, companyUrlConfig) {
	return DS.defineResource({
		name: 'locations',
		basePath: '',
		endpoint: companyUrlConfig.companyApi + "/api-config/v1/company/{companyId}/locations?include=address",
		deserialize: function(resourceConfig, data) {
			var json = data.data.data;
			angular.forEach(json, function(value,key){
				if(value.locationName.toLowerCase().indexOf("remote") >= 0 || value.shortDesc.toLowerCase().indexOf("remote") >= 0){
					value.isRemote = true;
				}
			});
			return{
				id : JSON.stringify(json),
				data: json
			}
		}
	});
}
