'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-routing-number';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateRoutingNumber', require('./validate-routing-number.directive'));
