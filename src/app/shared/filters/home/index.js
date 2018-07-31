'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.home';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('startFrom', require('./start-from.filter'));
