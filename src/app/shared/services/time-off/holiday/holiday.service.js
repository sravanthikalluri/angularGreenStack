'use strict';

module.exports = HolidayService;

/* @ngInject */
function HolidayService(DS, globalUrlConfig) {
	return DS.defineResource({
		name: 'holiday',
		idAttribute: 'id',
		basePath: '',
		endpoint: globalUrlConfig.globalBase + globalUrlConfig.resources.company + '/{companyId}/' + globalUrlConfig.resources.holidays + '{hs}',
		deserialize: function(responseConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}
