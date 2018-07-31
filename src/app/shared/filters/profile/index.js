'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.profile';

module.exports = moduleName;

angular.module(moduleName, [])
	.filter('names', require('./names.filter'));
