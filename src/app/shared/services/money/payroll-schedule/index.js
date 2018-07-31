'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.payroll-schedule';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('PayrollSchedule', require('./payroll-schedule.service'));
