'use strict';

module.exports = HolidayService;

/* @ngInject */
function HolidayService(DS) {
	return DS.defineResource({
		name: 'holiday-list',
		idAttribute: 'id',
		basePath: '',
		endpoint: '/api-company/v1/company-policy/' + '{companyId}' + '/holiday-schedule',
		deserialize: function(responseConfig, response) {
			var json = response.data.data;
			json.id = JSON.stringify(json);
			return json;
		}
	});
}
