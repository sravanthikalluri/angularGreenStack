'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.earnings-statement';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('EarningsStatement', require('./earnings-statement.service.js'));
