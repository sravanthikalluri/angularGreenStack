'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-phone';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validatePhone', require('./validate-phone.directive'));
