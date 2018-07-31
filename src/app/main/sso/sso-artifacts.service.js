'use strict';

module.exports = ssoArtifactsService;

/* @ngInject */
function ssoArtifactsService(DS, stringUtil) {
	
	var me = DS.defineResource({
		name: 'sso-artifacts',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-sso/v1/sso/{companyId}/{empId}/sso-artifacts/{ssoId}?peoId={peoId}&param={param}',
		deserialize: function(resourceConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});

	me.find.before(function(params, options) {
		var model = this;
		// This hack is because the variable is already resolved after the first time
		//Ex: If any of the {variable} changes we're still using the already resolved 
		model.endpoint = '/api-sso/v1/sso/{companyId}/{empId}/sso-artifacts/{ssoId}?peoId={peoId}&param={param}';  
		model.endpoint = stringUtil.format(model.endpoint, options);

		return [params, options];
	});

	me.createStorageKey = function(userId, companyId, peoId, ssoId, param) {
		return userId + companyId + peoId + ssoId + param;
	};

	me.getSSOResponseFromLocalStorage = function(storageKey) {
		var ssoResponseAsJson = localStorage.getItem(storageKey);
		if (ssoResponseAsJson) {
			return angular.fromJson(ssoResponseAsJson);
		}
		return null;
	};

	me.cacheSSOResponseToLocalStorage = function(values, storageKey) {
		if (!angular.equals(values, me.getSSOResponseFromLocalStorage(storageKey))) {
			localStorage.setItem(storageKey, angular.toJson(values));
		}
	};

	return me;
}
