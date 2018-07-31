'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.employee';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('checkedUnCheckedItems', require('./check-un-check.filter'))
	.filter('status', require('./status.filter'))
	.filter('groupBy', require('./group-by.filter'));
