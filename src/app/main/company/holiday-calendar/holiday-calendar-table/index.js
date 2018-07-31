'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.holiday-calendar.holiday-calendar-table';


module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnHolidayCalendarTable', require('./holiday-calendar-table.component'));
