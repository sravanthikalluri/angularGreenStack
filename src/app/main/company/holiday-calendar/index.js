'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.holiday-calendar';
var holidayCalendarTableModule = require('./holiday-calendar-table');

module.exports = moduleName;

angular.module(moduleName, [holidayCalendarTableModule])
	.component('tnHolidayCalendar', require('./holiday-calendar.component'));
