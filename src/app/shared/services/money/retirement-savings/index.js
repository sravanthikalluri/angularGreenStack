'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.retirement-savings';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('RetirementSavings', require('./retirement-savings.service'));
