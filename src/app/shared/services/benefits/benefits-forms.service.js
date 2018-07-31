'use strict';

module.exports = BenefitsForms;

/* @ngInject */
function BenefitsForms(DS) {
	return DS.defineResource({
		name: 'benefits-forms',
		idAttribute: 'id',
		basePath: '',
		//endpoint: 'benefits-forms.json',
		endpoint: '/api-company/v1/forms/{companyId}/{empId}/',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				forms : data.data.data.forms
			}
		}
	});
}
