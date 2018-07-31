'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-custom';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateCustom', require('./validate-custom.directive'));
