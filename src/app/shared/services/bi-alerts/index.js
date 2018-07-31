'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.bi-alerts';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('BiAlerts', require('./bi-alerts.service'));
