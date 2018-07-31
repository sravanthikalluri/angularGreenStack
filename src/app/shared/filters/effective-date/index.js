'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.effective-date';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('effectiveDate', require('./effective-date.filter'));
