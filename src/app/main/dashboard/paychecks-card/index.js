'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.paychecks-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('paychecksCard', require('./paychecks-card.component'));
