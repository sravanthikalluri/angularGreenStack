'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.sso';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('SsoRetirementSavingsService', require('./sso-retirement-savings.service'));
