'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.retirement-savings';
var retirementSavingsModalModule = require('./retirement-savings-modal');

module.exports = moduleName;

angular.module(moduleName, [retirementSavingsModalModule])
	.component('retirementSavingsCard', require('./retirement-savings.component'));
