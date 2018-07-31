'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.location';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Location', require('./location.service'));
