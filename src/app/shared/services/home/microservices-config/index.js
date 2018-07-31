'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.microservices-config';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('MicroservicesConfigService', require('./microservices-config.service'));
