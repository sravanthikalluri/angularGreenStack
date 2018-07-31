'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.hrpsession-services';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('HRPSessionService', require('./hrpsession.service'));
