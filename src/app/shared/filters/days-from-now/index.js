'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.days-from-now';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('daysFromNow', require('./days-from-now.filter'));
