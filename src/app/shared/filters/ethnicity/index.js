'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.ethnicity';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('ethnicity', require('./ethnicity.filter'));
