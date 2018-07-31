'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.ssn';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('ssn', require('./ssn.filter'));
