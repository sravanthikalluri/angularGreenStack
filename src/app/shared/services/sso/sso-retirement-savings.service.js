'use strict';

module.exports = SsoRetirementSavingsService;

/* @ngInject */
function SsoRetirementSavingsService(DS) {
	return DS.defineResource({
		name: 'sso-retirement-savings',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-sso/v1/sso/{companyId}/{empId}/sso-artifacts?peoId={peoId}&category=retirementsavings',
		deserialize: function(responseConfig, data) {
			return {
				id : JSON.stringify(data),
				ssoRetirementSavingsData : data.data.data
			}
		}
	});
}
