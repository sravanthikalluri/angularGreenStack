'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.direct-deposit';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('DirectDeposit', require('./direct-deposit.service'));
