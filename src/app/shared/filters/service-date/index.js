'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.service-date';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('serviceDate', require('./service-date.filter'));
