'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-retirement-amount';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateRetirementAmount', require('./validate-retirement-amount.directive'));
