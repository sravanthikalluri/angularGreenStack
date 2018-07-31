'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.benefits';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('primaryContingentItems', require('./primary-contingent-items.filter'));
