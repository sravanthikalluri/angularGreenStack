'use strict';

module.exports = InterstitialDataService;

/* @ngInject */
function InterstitialDataService(DS, homeUrlConfig) {
	return DS.defineResource({
		name: 'interstitial-data',
		idAttribute: 'id',
		basePath: '',
		endpoint:  homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.interstitial + '/{companyId}/{empId}' + homeUrlConfig.resources.page,
		deserialize: function(resourceConfig, response) {
			// The interstitial service returns null if no required pages.
			if (!response.data.data) {
				return null;
			}

			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}
