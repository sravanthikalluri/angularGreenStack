'use strict';

module.exports = CompanyFormsService;

/* @ngInject */
function CompanyFormsService(DS) {
	return DS.defineResource({
		name: 'formsService',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-company/v1/forms/{companyId}/{empId}/',
		deserialize: function(resourceConfig, data) {
			var data = data.data.data;
			return{
				id : JSON.stringify(data),
				formsDetails: data
			};
		}
	});
}
