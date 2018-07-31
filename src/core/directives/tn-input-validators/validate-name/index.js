'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-name';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateName', require('./validate-name.directive'));
