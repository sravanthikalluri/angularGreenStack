'use strict';

var angular = require('angular');
var timeOffCarouselModule = require('./time-off-carousel');
var timeOffTableModule = require('./time-off-table');
var moduleName = 'app.main.dashboard.time-off-card';

module.exports = moduleName;

angular.module(moduleName, [timeOffTableModule, timeOffCarouselModule])
	.component('timeOffCard', require('./time-off-card.component'));
