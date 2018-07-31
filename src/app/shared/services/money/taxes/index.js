'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.money.taxes';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('I9Status', require('./i9-status.service'))
	.service('w2Status', require('./w2-status.service'))
	.service('MaritalStatus', require('./marital-status.service'))
	.service('Taxes', require('./taxes.service'));
