'use strict';

module.exports = MaritalStatusService;

/* @ngInject */
function MaritalStatusService(DS) {
	return DS.defineResource({
		name: 'marital-statuses',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-config/v1/global/marital-statuses',
		deserialize: function(resourceConfig, data) {
			var data = data.data;
			return{
				id : JSON.stringify(data),
				marriedStatus: data.data
			};
		}
	});
}
