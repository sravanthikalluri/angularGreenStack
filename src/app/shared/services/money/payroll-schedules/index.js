'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.payroll-schedules';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('PayrollSchedules', require('./payroll-schedules.service'));
