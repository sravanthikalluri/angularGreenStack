'use strict';

module.exports = HolidayService;

/* @ngInject */
function HolidayService(DS, globalUrlConfig) {
	return DS.defineResource({
		name: 'activeHolidayCompany',
		idAttribute: 'id',
		basePath: '',
		cache : true,
		endpoint: globalUrlConfig.globalBaseCalender + globalUrlConfig.resources.holidayCalender + '/{companyId}/Y'+globalUrlConfig.resources.activeCompany,
		deserialize: function(responseConfig, response) {
			var json = response.data.data,
					id = JSON.stringify(json);
			return {
				id : id,
				isActive : json
			}
		}
	});
}
