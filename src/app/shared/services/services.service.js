'use strict';

module.exports = ServicesService;

/* @ngInject */
function ServicesService(DS, DSHttpAdapter, stringUtil, $window, gso, SharedDataService) {
	var me = this;

	// Returns keys for URL interpolation
	me._getKeys = function () {
		return {
			companyId: gso.getAppConfig().companyId,
			empId: $window.sessionStorage.getItem('empId'),
			personId: $window.sessionStorage.getItem('personId'),
			countryCode: SharedDataService.getAppSharedData().countryCode,
			hs: $window.sessionStorage.getItem('hs'),
			peoId: gso.getAppConfig().peoId
		};
	};

	me.init = function () {
		DS.bulkEjectAll = function (resourceNames) {
			resourceNames.forEach(function (name) {
				DS.ejectAll(name);
			});
		};

		// Overrides js-data getPath() method to auto-configure all model URLs
		DSHttpAdapter.getPath = function (method, resourceConfig, id, options) {
			var isHttpGetRequest = (method === 'find' || method === 'findAll');

			// Adding dynamic url parameters to endpoints using options.extraParams
			if (options.extraUrlParams != null) {
				resourceConfig.endpoint = stringUtil.format(resourceConfig.dynamicEndpoint, options.extraUrlParams);
			}

			resourceConfig.endpoint = stringUtil.format(resourceConfig.endpoint, me._getKeys());

			// URL Query Parameters
			options = options || {};
			angular.extend(options.params, isHttpGetRequest ? options.params : undefined);

			// Call JSData's default getPath() method
			return DSHttpAdapter.constructor.prototype.getPath.call(this, method, resourceConfig, id, options);
		};
	};

	return me;
}
