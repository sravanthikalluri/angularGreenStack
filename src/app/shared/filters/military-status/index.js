'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.military-status';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('militaryStatus', require('./military-status.filter'));
