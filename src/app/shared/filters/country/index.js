'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.country';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('country', require('./country.filter'));
