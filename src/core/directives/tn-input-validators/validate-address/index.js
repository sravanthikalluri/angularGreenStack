'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-address';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateAddress', require('./validate-address.directive'));
