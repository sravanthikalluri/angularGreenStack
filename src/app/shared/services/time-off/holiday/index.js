'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.time-off.holiday';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Holiday', require('./holiday.service'))
	.service('HolidayList', require('./holiday-list.service'))
	.service('activeCompany', require('./activeCompany.service'))
	.service('NewHolidayList',require('./new-holiday-list.service'))
	.service('HolidayCustomMessageService',require('./holiday-message.service'));
