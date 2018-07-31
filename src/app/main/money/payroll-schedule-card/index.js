'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.payroll-schedule-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('payrollScheduleCard', require('./payroll-schedule-card.component'));
