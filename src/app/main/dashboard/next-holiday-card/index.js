'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.next-holiday-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('nextHolidayCard', require('./next-holiday-card.component.js'));
