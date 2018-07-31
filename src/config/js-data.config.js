'use strict';

module.exports = jsDataConfig;

/** @ngInject */
function jsDataConfig(DSProvider, DSHttpAdapterProvider) {
	angular.extend(DSProvider.defaults, {});

	angular.extend(DSHttpAdapterProvider.defaults, {
		log: false,
		error: false,
		httpConfig: {
			timeout: 30000
		}
	});
}
