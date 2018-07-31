'use strict';

module.exports = NamesService;

/* @ngInject */
function NamesService(DS, profileUrlConfig) {
	return DS.defineResource({
		name: 'names',
		idAttribute: 'id',
		basePath: '',
		queryParams: { effectivedate: '' },
		endpoint: profileUrlConfig.profileBase + '{companyId}/{empId}/' + profileUrlConfig.resources.name,
		deserialize: function(resourceConfig, response) {
			var json = response.data;
			var data = json.data;

			if (data && data.prfNamesCurrentList.length && data.prfNamesCurrentList[0].middleName === null) {
				data.prfNamesCurrentList[0].middleName = '';
			}

			if (data && data.priNamesActiveList.length && data.priNamesActiveList[0].middleName === null) {
				data.priNamesActiveList[0].middleName = '';
			}

			if (data) {
				return {
					id        : JSON.stringify(json),
					primary   : data.priNamesActiveList[0],
					preferred : data.prfNamesCurrentList[0],
					initials  : data.prfNamesCurrentList.length ? (data.prfNamesCurrentList[0].firstName.trim().charAt(0).toUpperCase() + data.prfNamesCurrentList[0].lastName.trim().charAt(0).toUpperCase()) : (data.priNamesActiveList[0].firstName.trim().charAt(0).toUpperCase() + data.priNamesActiveList[0].lastName.trim().charAt(0).toUpperCase()),
					fullName  : data.prfNamesCurrentList.length ? (data.prfNamesCurrentList[0].firstName + ' ' + data.prfNamesCurrentList[0].middleName + ' ' + data.prfNamesCurrentList[0].lastName): (data.priNamesActiveList[0].firstName + ' ' + data.priNamesActiveList[0].middleName + ' ' + data.priNamesActiveList[0].lastName)
				};
			} else {
				return { id: 1 };
			}
		}
	});
}
