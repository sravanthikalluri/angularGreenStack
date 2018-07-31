'use strict';

module.exports = LegalNoticesService;

/* @ngInject */
function LegalNoticesService(DS) {
	return DS.defineResource({
		name: 'legalNoticesService',
		idAttribute: 'id',
		basePath: '',
		endpoint: 'api-company/v1/company-policy/{companyId}/{empId}/legalnotice',
		deserialize: function(resourceConfig, data) {
			var data = data.data.data.data;
			return{
				id : JSON.stringify(data),
				legalNotices: data
			};
		}
	});
}
