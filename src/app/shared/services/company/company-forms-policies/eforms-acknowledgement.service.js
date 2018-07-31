'use strict';

module.exports = EformsAcknowledgement;

/* @ngInject */
function EformsAcknowledgement(DS) {
	return {
		GET : DS.defineResource({
			name: 'eforms-acknowledgement',
			idAttribute: 'id',
			basePath: '',
			endpoint: '/api-company/v1/eforms/{companyId}/{empId}/form-statuses',
			deserialize: function (resourceConfig, response) {
				return {
					id: JSON.stringify(response.data),
					eforms_data: response.data.data.eforms_data
				};
			}
		}),
		POST : DS.defineResource({
			name: 'create-eforms-acknowledgement',
			idAttribute: 'id',
			basePath: '',
			endpoint: '/api-company/v1/eforms/{companyId}/{empId}/form-statuses',
			deserialize: function (resourceConfig, response) {
				return {
					id: JSON.stringify(response.data),
					response: response.data
				};
			}
		})
	}
}
