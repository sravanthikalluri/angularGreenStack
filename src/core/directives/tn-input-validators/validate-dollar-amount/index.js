'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-dollar-amount';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateDollarAmount', require('./validate-dollar-amount.directive'));
