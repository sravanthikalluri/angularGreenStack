'use strict';

module.exports = AddressService;

/* @ngInject */
function AddressService(DS, stringUtil, profileUrlConfig) {
	var Address =  DS.defineResource({
		name: 'address',
		idAttribute: 'uniqueId',
		queryParams: { effectivedate: '' },
		basePath: '',
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}/'+ profileUrlConfig.resources.address,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data) {
				return data.activeAddressList;
			} else {
				// returns a dummy value for non-GET requests
				return { uniqueId: 1 };
			}
		},
		computed: {
			fullAddressHtml: ['address1', 'address2', 'city', 'state', 'postalCode', function(address1, address2, city, state, postalCode) {
				var statePostal = stringUtil.join([state, postalCode], ' ');
				var strings = [
					stringUtil.join([address1, address2]),
					stringUtil.join([city, statePostal])
				];

				return stringUtil.join(strings, '<br>');
			}]
		}
	});

	return Address;
}
