'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.time-off-card.time-off-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('timeOffTable', require('./time-off-table.component'));
