'use strict';

var angular = require('angular');
var moduleName = 'app.main.money';
var modules = [
	require('./pay-history-card'),
	require('./last-paycheck-card'),
	require('./total-compensation'),
	require('./paychecks-and-statements'),
	require('./taxes'),
	require('./direct-deposit'),
	require('./payroll-schedule-card'),
	require('./employment-verification'),
	require('./retirement-savings'),
	require('./money-forms')
];

module.exports = moduleName;

angular.module(moduleName, modules)
	.component('money', require('./money.component'));
