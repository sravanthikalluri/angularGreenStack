'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.money';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('checkFilter', require('./money.filter'));
