'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money';

module.exports = moduleName;

angular.module(moduleName, [
	require('./paychecks'),
	require('./payroll-schedules'),
	require('./paycheck-details'),
	require('./payroll-schedule'),
	require('./taxes'),
	require('./direct-deposit'),
	require('./emp-verify'),
	require('./retirement-savings'),
	require('./earnings-statement'),
	require('./money-forms')
]);
