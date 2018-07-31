/**
 * Created by Krishnam Raju on 10/30/2017.
 */
'use strict';

module.exports = AleBasedService;

/* @ngInject */
function AleBasedService(DS) {
	return DS.defineResource({
		name: 'ale-selection',
		idAttribute: 'id',
		basePath: '',
		endpoint: "/api-employee/v1/manage-employee/{companyId}/{empId}/ale-event-notice",
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				res: data.data.data
			}
		}
	});
}
