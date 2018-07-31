'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-entry';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateEntry', require('./validate-entry.directive'));
