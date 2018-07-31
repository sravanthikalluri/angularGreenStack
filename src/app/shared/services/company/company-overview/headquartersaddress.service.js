'use strict';

module.exports = HeadQuartersAddressService;

/* @ngInject */
function HeadQuartersAddressService(DS, companyUrlConfig) {
	return DS.defineResource({
		name: 'headquarters-address',
		basePath: '',
		endpoint: companyUrlConfig.companyApi + "/api-config/v1/company/{companyId}/address",
		deserialize: function(resourceConfig, data) {
			var json = data.data.data;
			return{
				id : JSON.stringify(json),
				data: json
			}
		}
	});
}
