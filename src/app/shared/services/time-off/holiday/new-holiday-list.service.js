'use strict';

module.exports = NewHolidayService;

/* @ngInject */
function NewHolidayService(DS, globalUrlConfig) {
	return DS.defineResource({
		name: 'newHoliday-list',
		idAttribute: 'id',
		basePath: '',
		queryParams: { year: '' },
		cache : true,
		endpoint: globalUrlConfig.globalBaseCalender + globalUrlConfig.resources.holidayCalender + '/{companyId}/Y/wseView',
		deserialize: function(responseConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}
