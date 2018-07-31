'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-email';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateEmail', require('./validate-email.directive'));
