'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.cache';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('cache', require('./cache.service'));
