'use strict';

module.exports = ContactsService;

/* @ngInject */
function ContactsService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'contacts',
		idAttribute: 'id',
		queryParams: { excludehistory: true },
		basePath: '',
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}/' + profileUrlConfig.resources.contact,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data) {
				angular.forEach(data, function(d) {
					d.id = JSON.stringify(d);
					d.telephoneNumber = d.telephoneNumber ? d.telephoneNumber.replace(/\D/g,'') : null;
				});

				return data;
			} else {
				return { id: 1 };
			}
		}
	});
}
