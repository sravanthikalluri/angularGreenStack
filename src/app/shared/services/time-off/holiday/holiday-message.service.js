'use strict';

module.exports = HolidayCustomMessageService;

/* @ngInject */
function HolidayCustomMessageService(DS, globalUrlConfig) {
	return DS.defineResource({
		name: 'holiday-custom-message',
		idAttribute: 'id',
		basePath: '',
		cache : true,
		endpoint: globalUrlConfig.globalBaseCalender + globalUrlConfig.resources.holidayCalender + '/{companyId}/Y/customMessage',
		deserialize: function(responseConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}
