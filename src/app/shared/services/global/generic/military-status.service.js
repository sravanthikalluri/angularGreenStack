'use strict';

module.exports = MilitaryStatusesService;

/* @ngInject */
function MilitaryStatusesService(DS) {
	return DS.defineResource({
		name: 'military-statuses',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/{countryCode}/military-statuses',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				militaryStatus: data.data
			};
		}
	});
}
