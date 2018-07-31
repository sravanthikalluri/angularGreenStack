'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.gender';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('gender', require('./gender.filter'));
