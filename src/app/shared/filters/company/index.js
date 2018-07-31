'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.company';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('FLLFilters', require('./FLL.filter'));
